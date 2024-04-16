const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// 中间件，用于解析请求体中的 JSON 数据（如果有）
app.use(express.json());

// 通用请求处理器
app.use((req, res, next) => {
    console.log('Received a request:');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body) console.log('Body:', req.body);

    res.send('Request received, check your console!');  // 发送响应到客户端
    next();  // 调用下一个中间件
});

// 设置服务器监听的端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});