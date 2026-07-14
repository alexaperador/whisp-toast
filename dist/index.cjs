"use client"
"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Whisper: () => Whisper,
  whisp: () => whisp,
  whispStore: () => whispStore
});
module.exports = __toCommonJS(index_exports);

// src/store.ts
var whisps = [];
var listeners = [];
var idCounter = 0;
function emit() {
  listeners.forEach((listener) => listener(whisps));
}
function normalizeOptions(options) {
  if (typeof options === "number") return { duration: options };
  return options != null ? options : {};
}
function addWhisp(message, type = "default", options) {
  const { duration = 3e3, icon: icon2 } = normalizeOptions(options);
  const id = idCounter++;
  whisps = [{ id, message, type, icon: icon2 }];
  emit();
  if (duration > 0) {
    setTimeout(() => removeWhisp(id), duration);
  }
  return id;
}
function removeWhisp(id) {
  const whisp2 = whisps.find((w) => w.id === id);
  if (!whisp2 || whisp2.closing) return;
  whisps = whisps.map(
    (w) => w.id === id ? __spreadProps(__spreadValues({}, w), { closing: true }) : w
  );
  emit();
  setTimeout(() => {
    whisps = whisps.filter((w) => w.id !== id);
    emit();
  }, 250);
}
function subscribe(listener) {
  listeners.push(listener);
  listener(whisps);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
var whisp = Object.assign(
  (message, options) => addWhisp(message, "default", options),
  {
    success: (message, options) => addWhisp(message, "success", options),
    error: (message, options) => addWhisp(message, "error", options),
    info: (message, options) => addWhisp(message, "info", options),
    alert: (message, options) => addWhisp(message, "alert", options)
  }
);
var whispStore = { subscribe, removeWhisp };

// src/Whisper.tsx
var import_react = require("react");

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/styles.css
styleInject(".whisp-container {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  z-index: 9999;\n  pointer-events: none;\n}\n.whisp-container[data-vertical=top] {\n  top: 1.5rem;\n}\n.whisp-container[data-vertical=bottom] {\n  bottom: 1.5rem;\n  flex-direction: column-reverse;\n}\n.whisp-container[data-horizontal=right] {\n  right: 1.5rem;\n  align-items: flex-end;\n}\n.whisp-container[data-horizontal=left] {\n  left: 1.5rem;\n  align-items: flex-start;\n}\n.whisp-container[data-horizontal=center] {\n  left: 50%;\n  transform: translateX(-50%);\n  align-items: center;\n}\n.whisp-card {\n  pointer-events: auto;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-width: 280px;\n  max-width: 356px;\n  padding: 0.85rem 1rem;\n  background: var(--whisp-bg, #1a1a1a);\n  color: var(--whisp-text, #f5f5f5);\n  border: 1px solid var(--whisp-border, rgba(255, 255, 255, 0.08));\n  border-radius: var(--whisp-radius, 10px);\n  font-size: 0.85rem;\n  line-height: 1.3;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);\n  cursor: pointer;\n  animation: whisp-in 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;\n}\n.whisp-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  font-size: 0.7rem;\n  flex-shrink: 0;\n}\n.whisp-success .whisp-icon {\n  background: var(--whisp-success-bg, #22c55e);\n  color: var(--whisp-success-color, #052e16);\n}\n.whisp-error .whisp-icon {\n  background: var(--whisp-error-bg, #ef4444);\n  color: var(--whisp-error-color, #450a0a);\n}\n.whisp-info .whisp-icon {\n  background: var(--whisp-info-bg, #3b82f6);\n  color: var(--whisp-info-color, #172554);\n}\n.whisp-alert .whisp-icon {\n  background: var(--whisp-alert-bg, #f59e0b);\n  color: var(--whisp-alert-color, #451a03);\n}\n.whisp-card.whisp-out {\n  animation: whisp-out 0.25s ease forwards;\n}\n.whisp-container[data-vertical=bottom] .whisp-card.whisp-out {\n  animation-name: whisp-out-bottom;\n}\n@keyframes whisp-in {\n  from {\n    transform: translateY(16px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes whisp-out {\n  from {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(-16px) scale(0.95);\n    opacity: 0;\n  }\n}\n.whisp-container[data-vertical=bottom] .whisp-card.whisp-out {\n  animation-name: whisp-out-bottom;\n}\n@keyframes whisp-out-bottom {\n  from {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(16px) scale(0.95);\n    opacity: 0;\n  }\n}\n");

// src/icons/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var icon = {
  success: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  ),
  error: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 9-6 6" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 9 6 6" })
  ] }),
  info: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16v-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8h.01" })
  ] }),
  alert: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
      ]
    }
  )
};

// src/Whisper.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var defaultIcons = {
  success: icon.success,
  error: icon.error,
  info: icon.info,
  alert: icon.alert,
  default: null
};
function Whisper({ position = "top-center" }) {
  const [whisps2, setWhisps] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    const unsubscribe = whispStore.subscribe(setWhisps);
    return unsubscribe;
  }, []);
  const [vertical, horizontal] = position.split("-");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: "whisp-container",
      "data-vertical": vertical,
      "data-horizontal": horizontal,
      children: whisps2.map((w) => {
        var _a;
        const iconToShow = (_a = w.icon) != null ? _a : defaultIcons[w.type];
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: `whisp-card whisp-${w.type} ${w.closing ? "whisp-out" : ""}`,
            onClick: () => whispStore.removeWhisp(w.id),
            children: [
              iconToShow && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "whisp-icon", children: iconToShow }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "whisp-message", children: w.message })
            ]
          },
          w.id
        );
      })
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Whisper,
  whisp,
  whispStore
});
//# sourceMappingURL=index.cjs.map