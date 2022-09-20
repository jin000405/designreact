console.clear();

const { useState, useRef, useEffect } = React;

import classNames from "https://cdn.skypack.dev/classnames";

const {
  colors,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Chip,
  Box } =
MaterialUI;

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = newContent => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()) };


    setTodos(todos => [newTodo, ...todos]);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
    _index != index ? todo : { ...todo, content: newContent });

    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo };

}

function App() {
  const todosState = useTodosState();

  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n유산소\n상체\n하체볼륨 트레이닝");
    todosState.addTodo("명상");
    todosState.addTodo("공부");
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(AppBar, { position: "fixed" }, /*#__PURE__*/
    React.createElement(Toolbar, null, /*#__PURE__*/
    React.createElement("div", { className: "flex-1" }), /*#__PURE__*/
    React.createElement("span", { className: "font-bold" }, "HAPPY NOTE"), /*#__PURE__*/
    React.createElement("div", { className: "flex-1" }))), /*#__PURE__*/


    React.createElement(Toolbar, null), /*#__PURE__*/
    React.createElement("form", { onSubmit: onSubmit, className: "flex flex-col mt-4 px-4 gap-2" }, /*#__PURE__*/
    React.createElement(TextField, {
      minRows: 3,
      maxRows: 10,
      multiline: true,
      autoComplete: "off",
      name: "content",
      label: "\uD560\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
      variant: "standard" }), /*#__PURE__*/


    React.createElement(Button, { type: "submit", variant: "contained" }, "\uCD94\uAC00")), /*#__PURE__*/



    React.createElement("div", { className: "mt-4 px-4" }, /*#__PURE__*/
    React.createElement("ul", null,
    todosState.todos.map((todo, index) => /*#__PURE__*/
    React.createElement("li", { key: todo.id, className: "mt-10" }, /*#__PURE__*/
    React.createElement("div", { className: "flex gap-2" }, /*#__PURE__*/
    React.createElement(Chip, {
      label: `번호 : ${todo.id}`,
      variant: "outlined",
      className: "!pt-1" }), /*#__PURE__*/

    React.createElement(Chip, {
      label: todo.regDate,
      color: "primary",
      variant: "outlined",
      className: "!pt-1" })), /*#__PURE__*/


    React.createElement("div", { className: "mt-4 shadow rounded-[20px] flex" }, /*#__PURE__*/
    React.createElement(Button, {
      className: "flex-shrink-0 !items-start !rounded-[20px_0_0_20px]",
      color: "inherit" }, /*#__PURE__*/

    React.createElement("span", {
      className: classNames(
      "text-4xl",
      "h-[80px]",
      "flex items-center",
      {
        "text-[color:var(--mui-color-primary-main)]":
        index % 2 == 0 },

      { "text-[#dcdcdc]": index % 2 != 0 }) }, /*#__PURE__*/


    React.createElement("i", { className: "fa-solid fa-check" }))), /*#__PURE__*/


    React.createElement("div", { className: "flex-shrink-0 my-5 w-[2px] bg-[#dcdcdc] mr-4" }), /*#__PURE__*/
    React.createElement("div", { className: "whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center my-5" },
    todo.content), /*#__PURE__*/

    React.createElement(Button, {
      className: "flex-shrink-0 !items-start !rounded-[0_20px_20px_0]",
      color: "inherit" }, /*#__PURE__*/

    React.createElement("span", { className: "text-[#dcdcdc] text-2xl h-[80px] flex items-center" }, /*#__PURE__*/
    React.createElement("i", { className: "fa-solid fa-ellipsis-vertical" }))))))))));









}

const muiThemePaletteKeys = [
"background",
"common",
"error",
"grey",
"info",
"primary",
"secondary",
"success",
"text",
"warning"];


function Root() {
  // Create a theme instance.
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"] },

    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5' },

      secondary: {
        main: '#f50057' } } });




  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach(paletteKey => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return /*#__PURE__*/(
    React.createElement(ThemeProvider, { theme: theme }, /*#__PURE__*/
    React.createElement(CssBaseline, null), /*#__PURE__*/
    React.createElement(App, null)));


}

ReactDOM.render( /*#__PURE__*/React.createElement(Root, null), document.getElementById("root"));

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = n => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds()));

}