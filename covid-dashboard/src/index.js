//import './style.css';

import Controller from "./scripts/Controller/Controller.js";
import View from "./scripts/View/View.js";
import Model from "./scripts/Model/Model.js";

const view = new View();
const model = new Model();
const app = new Controller(view, model);
