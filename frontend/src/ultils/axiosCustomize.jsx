// src/utils/axiosCustomize.js
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/" // Thêm dấu hai chấm sau http
});
