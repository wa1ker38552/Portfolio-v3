function toggleText() {
    const moreText = dquery("#moreText")
    const show = moreText.style.display == "none" ? true : false
    if (show) {
        dquery("#textMore").innerHTML = "less"
    } else {
        dquery("#textMore").innerHTML = "more"
    }
    moreText.style.display = show ? "" : "none"
}

function setProjectView(index, e) {
    try {
        dquery('.glass-button-selected').classList.remove("glass-button-selected")
        e.classList.add("glass-button-selected")
    } catch {}

    function hideAll() {
        const appContainer = dquery(".app-container")
        const scriptContainer = dquery(".script-container")
        appContainer.style.display = "none"
        scriptContainer.style.display = "none"
        appContainer.style.opacity = "0"
        scriptContainer.style.opacity = "0"
    }

    hideAll()
    if (index == 0) {
        const appContainer = dquery(".app-container")
        appContainer.style.display = ""
        void appContainer.offsetWidth;
        appContainer.style.opacity = "1"
    } else {
        const scriptContainer = dquery(".script-container")
        scriptContainer.style.display = ""
        void scriptContainer.offsetWidth; // force reset
        scriptContainer.style.opacity = "1"
    }
}

function setActiveTab(i, e) {
    try {
        dquery('.active-tab').classList.remove("active-tab")
    } catch {}
    e.classList.add("active-tab")
    dquery('.notepad-content').value = TABS[i].content.trim().split('\n').map(line => line.trim()).join('\n')
}

function toggleApp(e, self) {
    if (e.style.display == "none") {
        e.style.display = ""
        self.querySelector(".app").classList.add("selected-app")
    } else {
        e.style.display = "none"
        self.querySelector(".app").classList.remove("selected-app")
    }
}

window.onload = function() {
    dquery("#age").innerHTML = new Date().getFullYear()-2007-1
    dquery("#years").innerHTML = new Date().getFullYear()-2018

    window.onclick = function(e) {
        if (e.target.className.includes("modal-background")) {
            animateCloseModal(e.target)
        }
    }

    // load projects
    const appContainer = dquery('.app-container')
    for (p of APPS) {
        appContainer.append(dcreate("div", "project", `
        <div>
            <div class="horizontal-container">
                <h3>${p.name}</h3>
                <div class="label fira-code">${p.time}</div>
            </div>
            <div class="horizontal-container">
                ${p.technologies.map(i => `<div class="technology">${i}</div>`).join('\n')}
            </div>
            <div class="gap"></div>
            ${p.description}
        </div>
        <div class="vertical-container">
            <button class="view-button centered-children ${p.code ? "active-view-button" : ""}" ${p.code ? `onclick="window.open('${p.code}', '_blank')"` : ""}><img src="assets/icon_code.svg"></button>
            <button class="view-button centered-children ${p.demo ? "active-view-button" : ""}" ${p.demo ? `onclick="window.open('${p.demo}', '_blank')"` : ""}><img src="assets/icon_eye.svg"></button>
        </div>
        `))
    }

    const scriptContainer = dquery('.script-container')
    for (p of SCRIPTS) {
        scriptContainer.append(dcreate("div", "project", `
        <div>
            <h4>${p.name}</h4>
            <div class="label">${p.description}</div>
        </div>
        <div class="view-button centered-children ${p.code ? "active-view-button" : ""}" ${p.code ? `onclick="window.open('${p.code}', '_blank')"` : ""}><img src="assets/icon_code.svg"></div>
        `))
    }

    setProjectView(0, dquery('.glass-button-selected'))

    const tabContainer = dquery("#tabContainer")
    TABS.forEach((t, i) => {
        const e = dcreate("div", "tab", t.fileName)
        e.onclick = function() {setActiveTab(i, e)}
        tabContainer.append(e)
    })
    setActiveTab(0, dquery('.tab'))
}