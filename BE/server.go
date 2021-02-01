package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
)

func saveTask(db *gorm.DB) func(echo.Context) error {
	return func(c echo.Context) error {
		task := &Task{}
		if err := c.Bind(task); err != nil {
			return err
		}
		task.IsFinished = false

		db.Create(task)
		return c.JSON(http.StatusCreated, task)
	}
}
func getTasks(db *gorm.DB) func(echo.Context) error {
	return func(c echo.Context) error {
		tasks := make([]Task, 0)
		user := c.QueryParam("user")

		if user != "" {
			db.Where("user = ?", user).Find(&tasks)
		} else {
			db.Find(&tasks)
		}

		return c.JSON(http.StatusOK, tasks)
	}
}
func finishTask(db *gorm.DB) func(echo.Context) error {
	return func(c echo.Context) error {
		taskId := c.Param("id")
		task:=&Task{}

		db.First(&task,taskId)
		task.IsFinished = true
		db.Save(&task)

		return c.JSON(http.StatusOK,task)
	}
}
func deleteTask(db *gorm.DB) func(echo.Context) error {
	return func(c echo.Context) error {
		taskId := c.Param("id")
		db.Delete(&Task{}, taskId)
		return c.String(http.StatusOK,"Deleted")
	}
}

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Task{})

	e.POST("/tasks", saveTask(db))
	e.GET("/tasks", getTasks(db))
	e.PUT("/tasks/:id", finishTask(db))
	e.DELETE("/tasks/:id", deleteTask(db))

	e.Logger.Fatal(e.Start(":2137"))
}
