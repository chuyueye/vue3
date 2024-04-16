const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

const filePath = './students.json';

let students; //作用域！！！
// 检查文件是否存在
if (fs.existsSync(filePath)) {
    students = require(filePath); // 文件存在，加载数据
    console.log(students);
} else {
    console.log('文件不存在，无法加载！\n 回退回原始数据！');
    //初始数据，数据库json丢失时回退
    students = [
        { id: 1, name: '张三', scores: { chinese: 85, math: 92, english: 78 } },
        { id: 2, name: '李四', scores: { chinese: 88, math: 74, english: 90 } },
        { id: 3, name: '王五', scores: { chinese: 95, math: 88, english: 85 } },
    ];
}

app.use(cors());

app.use(express.json()); // 用于解析 JSON 格式的请求体

function saveStudentsData() {// 将学生数据转换为JSON格式字符串
    const jsonData = JSON.stringify(students, null, 2);

    // 将JSON数据写入文件
    fs.writeFile('students.json', jsonData, (err) => {
        if (err) {
            console.error('写入文件时发生错误:', err);
        } else {
            console.log('数据成功保存到文件');
        }
    });
}
saveStudentsData() // 第一次执行



// 获取学生数据的接口
app.get('/students', (req, res) => {
    res.json(students);
});

// 接收学生数据的接口
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).send('Student added');
});

app.post('/save', (req, res) => {
    const newStudents = req.body;
    console.log(newStudents);

    students = newStudents;
    saveStudentsData()  //修改本地文件
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});