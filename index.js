import express from "express"

const PORT = process.env.PORT || 3000;
const MONGO_STRING = process.env.MONGO_STRING;

const app = CreateApp();

app.listen