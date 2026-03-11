const mapStates = [
  { name: "Jammu & Kashmir", label: "J&K", path: "M170 60 L240 42 L284 72 L268 118 L210 132 L152 102 Z", fill: "#f5d8bf", textX: 219, textY: 91 },
  { name: "Himachal Pradesh", label: "HP", path: "M272 120 L338 110 L356 148 L320 182 L260 172 L246 142 Z", fill: "#f1c96f", textX: 302, textY: 147 },
  { name: "Punjab", label: "Punjab", path: "M204 142 L256 132 L268 178 L228 206 L184 186 L182 156 Z", fill: "#e9c0a4", textX: 224, textY: 171 },
  { name: "Uttarakhand", label: "Uttarakhand", path: "M356 124 L438 124 L458 156 L404 190 L336 182 L326 148 Z", fill: "#c8df9d", textX: 394, textY: 160 },
  { name: "Haryana", label: "Haryana", path: "M264 178 L328 170 L336 222 L280 236 L240 212 L238 188 Z", fill: "#d3c0e9", textX: 290, textY: 206 },
  { name: "Rajasthan", label: "Rajasthan", path: "M138 198 L244 186 L272 234 L256 330 L146 356 L92 282 L110 218 Z", fill: "#efd698", textX: 186, textY: 273 },
  { name: "Uttar Pradesh", label: "UP", path: "M332 184 L490 184 L514 222 L478 268 L336 266 L310 222 Z", fill: "#f4c0cb", textX: 413, textY: 224 },
  { name: "Bihar", label: "Bihar", path: "M500 196 L576 196 L606 228 L566 272 L494 264 L478 226 Z", fill: "#f4d0ad", textX: 544, textY: 230 },
  { name: "Jharkhand", label: "Jharkhand", path: "M482 270 L564 278 L554 332 L478 338 L444 298 Z", fill: "#d9c0ea", textX: 518, textY: 307 },
  { name: "West Bengal", label: "West Bengal", path: "M578 240 L640 228 L666 272 L642 346 L590 354 L570 292 Z", fill: "#c8e5ea", textX: 622, textY: 288 },
  { name: "Odisha", label: "Odisha", path: "M468 338 L564 336 L604 386 L574 458 L500 456 L454 394 Z", fill: "#f3efb7", textX: 528, textY: 397 },
  { name: "Gujarat", label: "Gujarat", path: "M72 320 L144 298 L182 322 L160 406 L102 430 L46 384 Z", fill: "#f0d1af", textX: 112, textY: 364 },
  { name: "Madhya Pradesh", label: "Madhya Pradesh", path: "M260 244 L454 248 L476 344 L408 406 L278 392 L232 300 Z", fill: "#dfd4cb", textX: 354, textY: 323 },
  { name: "Chhattisgarh", label: "Chhattisgarh", path: "M410 308 L484 306 L516 390 L482 472 L420 430 L396 362 Z", fill: "#d7c1dd", textX: 455, textY: 378 },
  { name: "Maharashtra", label: "Maharashtra", path: "M180 386 L294 392 L382 420 L366 506 L222 526 L154 458 Z", fill: "#f3c0ca", textX: 266, textY: 454 },
  { name: "Goa", label: "Goa", path: "M144 462 L170 458 L174 500 L150 510 L134 488 Z", fill: "#aee5d8", textX: 155, textY: 488 },
  { name: "Karnataka", label: "Karnataka", path: "M184 514 L272 518 L300 640 L232 722 L162 664 L152 562 Z", fill: "#f2b669", textX: 224, textY: 615 },
  { name: "Telangana", label: "Telangana", path: "M312 426 L382 424 L410 500 L366 552 L304 520 Z", fill: "#ef9bb2", textX: 355, textY: 489 },
  { name: "Tamil Nadu", label: "Tamil Nadu", path: "M284 640 L352 608 L402 706 L340 820 L264 780 L248 688 Z", fill: "#9fc0eb", textX: 327, textY: 719 },
  { name: "Kerala", label: "Kerala", path: "M200 690 L244 704 L252 820 L212 852 L188 790 L186 716 Z", fill: "#b9ddb3", textX: 220, textY: 775 },
  { name: "Assam", label: "Assam", path: "M612 186 L706 178 L734 214 L694 244 L614 232 L590 204 Z", fill: "#b7dfab", textX: 663, textY: 212 },
  { name: "Arunachal Pradesh", label: "Arunachal", path: "M618 120 L736 116 L748 170 L668 190 L602 164 Z", fill: "#e8cdac", textX: 679, textY: 151 },
  { name: "Nagaland", label: "Nagaland", path: "M688 238 L728 230 L738 282 L704 304 L676 274 Z", fill: "#d5bbe4", textX: 710, textY: 269 },
  { name: "Manipur", label: "Manipur", path: "M694 310 L730 302 L740 360 L706 382 L682 346 Z", fill: "#f4cad4", textX: 713, textY: 341 },
  { name: "Mizoram", label: "Mizoram", path: "M660 386 L708 380 L720 468 L684 500 L648 438 Z", fill: "#e8d49a", textX: 687, textY: 438 },
  { name: "Sikkim", label: "Sikkim", path: "M586 188 L612 176 L626 228 L602 252 L578 224 Z", fill: "#d9cff1", textX: 603, textY: 217 }
];

function loadDanceData() {
  if (!Array.isArray(window.DANCE_DATA)) {
    throw new Error("Dance data could not be loaded.");
  }
  return window.DANCE_DATA;
}

function createMap(svg, states, onSelect) {
  const labelBreaks = {
    "Jammu & Kashmir": ["Jammu &", "Kashmir"],
    "Himachal Pradesh": ["Himachal", "Pradesh"],
    "Uttar Pradesh": ["Uttar", "Pradesh"],
    "West Bengal": ["West", "Bengal"],
    "Madhya Pradesh": ["Madhya", "Pradesh"],
    "Arunachal Pradesh": ["Arunachal", "Pradesh"],
    "Chhattisgarh": ["Chhattis", "garh"],
    "Uttarakhand": ["Uttara", "khand"],
    "Tamil Nadu": ["Tamil", "Nadu"]
  };

  svg.innerHTML = `
    <defs>
      <linearGradient id="mapGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff7ea"></stop>
        <stop offset="100%" stop-color="#f4ede2"></stop>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="760" height="900" rx="32" fill="url(#mapGlow)"></rect>
  `;

  states.forEach((state) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("map-state");
    group.dataset.state = state.name;
    group.style.setProperty("--state-fill", state.fill);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `Select ${state.name}`);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", state.path);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", state.textX);
    text.setAttribute("y", state.textY);

    const lines = labelBreaks[state.name] || [state.label];
    lines.forEach((line, index) => {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", state.textX);
      tspan.setAttribute("dy", index === 0 ? "0" : "1.1em");
      tspan.textContent = line;
      text.appendChild(tspan);
    });

    group.append(path, text);
    group.addEventListener("click", () => onSelect(state.name));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(state.name);
      }
    });

    svg.appendChild(group);
  });
}

function selectMapState(stateName) {
  document.querySelectorAll(".map-state").forEach((node) => {
    node.classList.toggle("active", node.dataset.state === stateName);
  });
}

function renderDanceLesson(stateName, dance) {
  document.getElementById("danceTitle").textContent = dance.name;
  document.getElementById("danceDescription").textContent = `${dance.description} This lesson connects ${dance.name} to the cultural traditions of ${stateName}.`;
  document.getElementById("danceVideo").src = dance.video;
  document.getElementById("videoSection").classList.remove("empty");
}

function renderStateInfo(dataset, stateName) {
  const state = dataset.find((entry) => entry.state === stateName);
  if (!state) {
    return;
  }

  selectMapState(stateName);
  document.getElementById("stateTitle").textContent = state.state;
  document.getElementById("stateSummary").textContent = state.overview;
  document.getElementById("selectedStateLabel").textContent = state.state;
  document.getElementById("danceCountLabel").textContent = `${state.dances.length} traditions`;
  document.getElementById("dancePrompt").textContent = "Click a dance card to update the lesson below.";

  const danceList = document.getElementById("danceList");
  danceList.innerHTML = "";

  state.dances.forEach((dance) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dance-card";
    button.innerHTML = `
      <h4>${dance.name}</h4>
      <p>${dance.description}</p>
    `;
    button.addEventListener("click", () => {
      document.querySelectorAll(".dance-card").forEach((card) => card.classList.remove("active"));
      button.classList.add("active");
      renderDanceLesson(state.state, dance);
    });
    danceList.appendChild(button);
  });

  const firstCard = danceList.querySelector(".dance-card");
  if (firstCard) {
    firstCard.classList.add("active");
    renderDanceLesson(state.state, state.dances[0]);
  }
}

function initializeHomePage() {
  if (document.body.dataset.page !== "home") {
    return;
  }

  try {
    const danceDataset = loadDanceData();
    const svg = document.getElementById("indiaMap");
    createMap(svg, mapStates, (stateName) => renderStateInfo(danceDataset, stateName));
    renderStateInfo(danceDataset, "Punjab");
  } catch (error) {
    document.getElementById("stateTitle").textContent = "Content unavailable";
    document.getElementById("stateSummary").textContent = error.message;
  }
}

document.addEventListener("DOMContentLoaded", initializeHomePage);
