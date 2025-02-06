package main

import (
	"fmt"
	"net/http"
//	"time"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 定义数据模型（对应数据库表）
type Product struct {
	ID    uint    `json:"id" gorm:"primaryKey"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

func main() {
	// 1. 连接 MySQL 数据库（替换为你的数据库密码）
	dsn := "www_foundright_x:zxj123@tcp(127.0.0.1:3306)/www_foundright_x"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("数据库连接失败: " + err.Error())
	}else{
		fmt.Println("数据库连接成功")
	}
	// 确保数据库连接正常
	sqlDB, err := db.DB()
	if err != nil {
		panic("获取数据库连接失败: " + err.Error())
	}
	if err := sqlDB.Ping(); err != nil {
		panic("数据库连接不可用: " + err.Error())
	}

	// 自动创建表（如果不存在）
	err = db.AutoMigrate(&Product{})
	if err != nil {
		panic("自动迁移失败: " + err.Error())
	}

	// 2. 初始化 Gin 路由
	r := gin.Default()

	// 3. 允许跨域（开发环境用）
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET")
		c.Next()
	})

	// 4. 定义 API 路由
	// 获取所有商品
	r.GET("/api/products", func(c *gin.Context) {
//		clientIP := c.ClientIP()
 //   		requestTime := time.Now().Format("2006-01-02 15:04:05")

//    		fmt.Println(requestTime + clientIP + " "+c.Request.RequestURI)

		var products []Product
		// 查询所有商品，并处理错误
		if err := db.Find(&products).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "查询商品失败",
			})
			fmt.Println("查询商品失败:",err);
			return
		}
		fmt.Println("查询商品成功:",products);
		c.JSON(http.StatusOK, products)
	})

	// 5. 启动服务（监听 8080 端口）
	if err := r.Run("0.0.0.0:8080"); err != nil {
		fmt.Println("服务启动失败:", err)
	}
}
