111
res.on('end', () => {
    response.end(JSON.stringify({
        ret: true,
        data
    }))
})
})

})

server.listen(8080, () => {
    console.log('localhost:8080')
})
    ```

**04.4 模拟post：服务器提交（攻击）**

```js
const https = require('https')
const querystring = require('querystring')

const postData = querystring.stringify({
    province: '上海',
    city: '上海',
    district: '宝山区',
    address: '同济支路199号智慧七立方3号楼2-4层',
    latitude: 43.0,
    longitude: 160.0,
    message: '求购一条小鱼',
    contact: '13666666',
    type: 'sell',
    time: 1571217561
})

const options = {
    protocol: 'https:',
    hostname: 'ik9hkddr.qcloud.la',
    method: 'POST',
    port: 443,
    path: '/index.php/trade/add_item',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

function doPost() {
    let data

    let req = https.request(options, (res) => {
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
            console.log(data)
        })
    })

    req.write(postData)
    req.end()
}

// setInterval(() => {
//   doPost()
// }, 1000)
```



**04.5 爬虫**

```js
const https = require('https')
const http = require('http')
const cheerio = require('cheerio')

http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': 'application/json;charset=utf-8'
    })

    const options = {
        // protocol: 'https:',
        hostname: 'i.maoyan.com',
        port: 443,
        path: '/',
        method: 'GET'
    }

    const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        })

        res.on('end', () => {
            filterData(data)
        })
    })

    function filterData(data) {
        //   console.log(data)
        let $ = cheerio.load(data)
        let $movieList = $('.column.content')
        console.log($movieList)
        let movies = []
        $movieList.each((index, value) => {
            movies.push({
                title: $(value).find('.movie-title .title').text(),
                detail: $(value).find('.detail .actor').text(),
            })
        })

        response.end(JSON.stringify(movies))
    }

    req.end()
}).listen(3000)
    ```

###### 	05  event模块

```js
const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter { }

const event = new MyEventEmitter()

event.on('play', (movie) => {
    console.log(movie)
})

event.emit('play', '我和我的祖国')
event.emit('play', '中国机长')
    ```

###### 	06  fs文件操作模块

```js
const fs = require('fs')

// 创建文件夹
fs.mkdir('./logs', (err) => {
    console.log('done.')
})

// 文件夹改名
fs.rename('./logs', './log', () => {
    console.log('done')
})

// 删除文件夹
fs.rmdir('./log', () => {
    console.log('done.')
})

// 写内容到文件里
fs.writeFile(
    './logs/log1.txt',
    'hello',
    // 错误优先的回调函数
    (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('文件创建成功')
        }
    }
)

// 给文件追加内容
fs.appendFile('./logs/log1.txt', '\nworld', () => {
    console.log('done.')
})

// 读取文件内容
fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
    console.log(data)
})

// 删除文件
fs.unlink('./logs/log1.txt', (err) => {
    console.log('done.')
})

// 批量写文件
for (var i = 0; i < 10; i++) {
    fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
        console.log('done.')
    })
}

// 读取文件/目录信息
fs.readdir('./', (err, data) => {
    data.forEach((value, index) => {
        fs.stat(`./${value}`, (err, stats) => {
            // console.log(value + ':' + stats.size)
            console.log(value + ' is ' + (stats.isDirectory() ? 'directory' : 'file'))
        })
    })
})

// 同步读取文件
try {
    const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
    console.log(content)
    console.log(0)
} catch (e) {
    console.log(e.message)
}

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
    console.log(content)
    console.log(0)
})
console.log(1)

// 异步读取文件：方法二
const fs = require("fs").promises
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
    console.log(result)
})

    ```

在`fs`模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，*必须使用异步代码*，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

###### 	07  stream流模块

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

![image-20220407085931744](%E7%AC%94%E8%AE%B0.assets/image-20220407085931744.png)

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

```js
var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：



```js
var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

```

`pipe` 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```js
const fs = require('fs')

const readstream = fs.createReadStream('./1.txt')
const writestream = fs.createWriteStream('./2.txt')

readstream.pipe(writestream)
    ```

###### 08 zlib

<img src="%E7%AC%94%E8%AE%B0.assets/image-20220407105916114.png" alt="image-20220407105916114" style="zoom:50%;" />

```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

readstream
    .pipe(gzip)
    .pipe(writestream)

    ```

###### 09 crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```js
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); 
