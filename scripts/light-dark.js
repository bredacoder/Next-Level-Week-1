const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")
const img = document.querySelector("#svg")

const getStyle = (element, style) => 
window
    .getComputedStyle(element)
    .getPropertyValue(style)

const initialColors = {
    bg: getStyle(html, "--bg"),
    titleColor: getStyle(html, "--title-color"),
    primaryColor: getStyle(html, "--primary-color"),
    bgForm: getStyle(html, "--bg-form"),
    field: getStyle(html, "--field"),
}

const darkMode = {
    bg: "#050505",
    titleColor: "#f7f7f7",
    bgForm: "#101010",
    field: "white",
}

const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
    })    
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode)  : changeColors(initialColors)
    target.checked ? img.src = "/assets/logo-dark.svg" : img.src = "/assets/logo.svg"
})

