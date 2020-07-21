const config = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: isInTest(),
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

function isInTest() {
    var isInTest = typeof global.it === 'function';
    if (!isInTest) return MYSQL_DB = "systemPractice";
    else return MYSQL_DB = "systemPracticeTest";
}

module.exports = config;