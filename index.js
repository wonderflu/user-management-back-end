const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const cors = require("cors");

const PORT = 3000;
const VERSION = "v1";
const ADMINTOKEN = "43889";
const USERTOKEN = "21333";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use((request, response, next) => {
  const token = request.headers.authorization;
  if (!!request.headers.authorization) {
    request.is_authorized = !!token;
    request.is_admin = token === ADMINTOKEN;
  }
  next();
});

let departments = [
  {
    id: 1,
    name: "Miscrosoft",
    description: "computer software, consumer electronics, personal computers, and related services.",
    created_at: Date.now(),
    update_at: Date.now(),
    employees: [
      {
        id: uuid(),
        username: "Employee1",
        email: "Employee1@example.com",
        first_name: "Employee",
        last_name: "Employee1",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee2",
        email: "Employee2@example.com",
        first_name: "Employee",
        last_name: "Employee2",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee3",
        email: "Employee3@example.com",
        first_name: "Employee",
        last_name: "Employee3",
        created_at: Date.now(),
        update_at: Date.now(),
      },
    ],
  },
  {
    id: 2,
    name: "Twitch",
    description: "stream",
    created_at: Date.now(),
    update_at: Date.now(),
    employees: [
      {
        id: uuid(),
        username: "Employee4",
        email: "Employee4@example.com",
        first_name: "Employee",
        last_name: "Employee4",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee5",
        email: "Employee5@example.com",
        first_name: "Employee",
        last_name: "Employee5",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee6",
        email: "Employee6@example.com",
        first_name: "Employee",
        last_name: "Employee6",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee7",
        email: "Employee7@example.com",
        first_name: "Employee",
        last_name: "Employee7",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee8",
        email: "Employee8@example.com",
        first_name: "Employee",
        last_name: "Employee8",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee9",
        email: "Employee9@example.com",
        first_name: "Employee",
        last_name: "Employee9",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee10",
        email: "Employee10@example.com",
        first_name: "Employee",
        last_name: "Employee10",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee11",
        email: "Employee11@example.com",
        first_name: "Employee",
        last_name: "Employee11",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee12",
        email: "Employee12@example.com",
        first_name: "Employee",
        last_name: "Employee12",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee13",
        email: "Employee13@example.com",
        first_name: "Employee",
        last_name: "Employee13",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee14",
        email: "Employee14@example.com",
        first_name: "Employee",
        last_name: "Employee14",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee15",
        email: "Employee15@example.com",
        first_name: "Employee",
        last_name: "Employee15",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee16",
        email: "Employee16@example.com",
        first_name: "Employee",
        last_name: "Employee16",
        created_at: Date.now(),
        update_at: Date.now(),
      },
    ],
  },
  {
    id: 3,
    name: "Youtube",
    description: "video",
    created_at: Date.now(),
    update_at: Date.now(),
    employees: [
      {
        id: uuid(),
        username: "Employee17",
        email: "Employee17@example.com",
        first_name: "Employee",
        last_name: "Employee17",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee18",
        email: "Employee18@example.com",
        first_name: "Employee",
        last_name: "Employee18",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee19",
        email: "Employee19@example.com",
        first_name: "Employee",
        last_name: "Employee19",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee20",
        email: "Employee20@example.com",
        first_name: "Employee",
        last_name: "Employee20",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee21",
        email: "Employee21@example.com",
        first_name: "Employee",
        last_name: "Employee21",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee22",
        email: "Employee22@example.com",
        first_name: "Employee",
        last_name: "Employee22",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee23",
        email: "Employee23@example.com",
        first_name: "Employee",
        last_name: "Employee23",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee24",
        email: "Employee24@example.com",
        first_name: "Employee",
        last_name: "Employee24",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee25",
        email: "Employee25@example.com",
        first_name: "Employee",
        last_name: "Employee25",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee26",
        email: "Employee26@example.com",
        first_name: "Employee",
        last_name: "Employee26",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee27",
        email: "Employee27@example.com",
        first_name: "Employee",
        last_name: "Employee27",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee27",
        email: "Employee27@example.com",
        first_name: "Employee",
        last_name: "Employee27",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee28",
        email: "Employee28@example.com",
        first_name: "Employee",
        last_name: "Employee28",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee29",
        email: "Employee29@example.com",
        first_name: "Employee",
        last_name: "Employee29",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee30",
        email: "Employee30@example.com",
        first_name: "Employee",
        last_name: "Employee30",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee31",
        email: "Employee31@example.com",
        first_name: "Employee",
        last_name: "Employee31",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee32",
        email: "Employee32@example.com",
        first_name: "Employee",
        last_name: "Employee32",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee33",
        email: "Employee33@example.com",
        first_name: "Employee",
        last_name: "Employee33",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee34",
        email: "Employee34@example.com",
        first_name: "Employee",
        last_name: "Employee34",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee35",
        email: "Employee35@example.com",
        first_name: "Employee",
        last_name: "Employee35",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee36",
        email: "Employee36@example.com",
        first_name: "Employee",
        last_name: "Employee36",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee37",
        email: "Employee37@example.com",
        first_name: "Employee",
        last_name: "Employee37",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee38",
        email: "Employee38@example.com",
        first_name: "Employee",
        last_name: "Employee38",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee39",
        email: "Employee39@example.com",
        first_name: "Employee",
        last_name: "Employee39",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee40",
        email: "Employee40@example.com",
        first_name: "Employee",
        last_name: "Employee40",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee41",
        email: "Employee41@example.com",
        first_name: "Employee",
        last_name: "Employee41",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee42",
        email: "Employee42@example.com",
        first_name: "Employee",
        last_name: "Employee42",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee43",
        email: "Employee43@example.com",
        first_name: "Employee",
        last_name: "Employee43",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee44",
        email: "Employee44@example.com",
        first_name: "Employee",
        last_name: "Employee44",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee45",
        email: "Employee45@example.com",
        first_name: "Employee",
        last_name: "Employee45",
        created_at: Date.now(),
        update_at: Date.now(),
      },
      {
        id: uuid(),
        username: "Employee46",
        email: "Employee46@example.com",
        first_name: "Employee",
        last_name: "Employee46",
        created_at: Date.now(),
        update_at: Date.now(),
      },
    ],
  },
  {
    id: 4,
    name: "Instagram",
    description: "photo",
    created_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 5,
    name: "Facebook",
    description: "profiles",
    created_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 6,
    name: "TikTok",
    description: "LOL",
    created_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 7,
    name: "Twitter",
    description: "chik chirik",
    created_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 8,
    name: "Blizzard",
    description: "games",
    created_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 9,
    name: "Valve",
    description: "dotka 2",
    created_at: Date.now(),
    update_at: Date.now(),
  },
];

app.post(`/api/${VERSION}/login/`, (request, response) => {
  const { username, password } = request.body;
  if (username === "Nataha" && password === "danger") {
    return response.json({ ADMINTOKEN });
  } else if (username === "Daria" && password === "danger") {
    return response.json({ USERTOKEN });
  } else if (username === "Olita" && password === "danger") {
    return response.json({ USERTOKEN });
  } else {
    return response.status(400).json({ message: "Bad request: The username or password is incorrect." });
  }
});

app.get(`/api/${VERSION}/departments`, (request, response) => {
  if (request.is_authorized) {
    return response.status(200).json({ departments });
  } else {
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this recourse." });
  }
});

app.get(`/api/${VERSION}/departments/:id`, (request, response) => {
  if (request.is_authorized) {
    const { id } = request.params;
    const departmentById = departments.find((department) => department.id === parseInt(id));
    return response.status(200).json({ departmentById });
  } else {
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this recourse." });
  }
});

app.get(`/api/${VERSION}/departments/:id/employees`, (request, response) => {
  if (request.is_authorized) {
    const { id } = request.params;
    const departmentById = departments.find((department) => department.id === parseInt(id));
    const employeeByDepartmentId = departmentById.employees;
    return response.status(200).json({ employeeByDepartmentId });
  } else {
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this recourse." });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
});
