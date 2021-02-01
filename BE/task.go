package main

import "time"

type Task struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	User        string    `json:"user"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	IsFinished  bool      `json:"isFinished"`
}