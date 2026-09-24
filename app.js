const THEME_KEY = "bluegrass-demo-theme";
const DEFAULT_THEME = "classic";

const builderForm = document.getElementById("builderForm");
const builderResult = document.getElementById("builderResult");
const builderSummary = document.getElementById("builderSummary");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");
const chatLog = document.getElementById("chatLog");
const quoteForm = document.getElementById("quoteForm");
const quoteSuccess = document.getElementById("quoteSuccess");
const approveDraftButton = document.getElementById("approveDraft");
const approveNote = document.getElementById("approveNote");
const mailPreview = document.getElementById("mailPreview");

const mailData = {
  rfq1: {
    lane: "hot",
    from: "Facilities Manager · Greenwood Family Clinic",
    subject: "Storefront replacement at clinic (Warren County)",
    body: "Need a new front entry after glass and door damage. Looking for door, frame check, and hardware review.",
    draft:
      "Thanks for reaching out. We can review your storefront opening and put together the right door, frame, and hardware plan. If you can share opening size and photos, we will have Sonya call you to schedule the next step."
  },
  rfq2: {
    lane: "hot",
    from: "Project Superintendent · South Warren Renovation",
    subject: "Fire-rated pair for school renovation",
    body: "Need a pair of rated doors and hardware package, submittal-ready. Please advise what details you need first.",
    draft:
      "Appreciate the note. For a fire-rated opening we need wall type, rating requirement, opening dimensions, and hardware preference. Once we have that, our office can prepare a clean quote path for your project."
  },
  inc1: {
    lane: "incomplete",
    from: "Homeowner · Bowling Green",
    subject: "Need new front door ASAP",
    body: "Can you quote me a front door? Not sure on size yet.",
    draft:
      "Happy to help with your replacement door. To get the right recommendation, please share your city, a photo of the opening, and if you want just the door or door plus frame and hardware."
  },
  spam1: {
    lane: "spam",
    from: "Cold Outreach Bot",
    subject: "SEO package guarantee",
    body: "Guaranteed rankings and instant growth package. Reply now.",
    draft: "No draft. Marked as spam/noise."
  }
};

function setTheme(themeName) {
  const html = document.documentElement;
  const themeButtons = document.querySelectorAll(".look-btn");
  html.setAttribute("data-theme", themeName);
  localStorage.setItem(THEME_KEY, themeName);
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeTarget === themeName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function initializeThemeToggle() {
  const themeButtons = document.querySelectorAll(".look-btn");
  const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  setTheme(savedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.themeTarget);
    });
  });
}

function createSummaryItem(label, value) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${label}:</strong> ${value}`;
  return li;
}

function initializeBuilder() {
  builderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(builderForm);
    const selectedPerformance = Array.from(
      builderForm.querySelectorAll("input[name='performance']:checked")
    ).map((checkbox) => checkbox.value);

    builderSummary.innerHTML = "";
    builderSummary.append(
      createSummaryItem("Project type", formData.get("projectType")),
      createSummaryItem("Opening type", formData.get("openingType")),
      createSummaryItem(
        "Performance priorities",
        selectedPerformance.length > 0 ? selectedPerformance.join(", ") : "Not specified yet"
      ),
      createSummaryItem("Scope", formData.get("scope")),
      createSummaryItem("Notes", formData.get("notes") || "No additional notes supplied")
    );

    builderResult.classList.remove("hidden");
    builderResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function appendMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getAssistantReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("fire")) {
    return "Yes ma'am / yes sir — we handle fire-rated door openings. If you share opening size and rating requirement, we can line up the right door, frame, and hardware package.";
  }
  if (lower.includes("residential") || lower.includes("home")) {
    return "We handle residential replacements too. If you send a photo and rough measurements, we can help sort door-only versus full door, frame, and hardware scope.";
  }
  if (lower.includes("flag")) {
    return "We install flagpoles as well. Share height and site location and we can route it to the team for a proper follow-up.";
  }
  if (lower.includes("quote") || lower.includes("rfq") || lower.includes("storefront")) {
    return "For the quickest quote path, use the form below with job location, opening type, and best contact. Sonya or the office can follow up directly.";
  }

  return "Thanks for the note. We can help sort that request. If you share opening type, location, and what problem you're solving, we can hand it off to the office for follow-up.";
}

function initializeAssistant() {
  appendMessage(
    "bot",
    "You're in demo mode. Ask about openings, fire-rated work, residential replacement, flagpoles, or quote prep."
  );
  appendMessage(
    "bot",
    "Need immediate help? Call 270-780-3235 or email sonya@bluegrassdoor.com for a real human handoff."
  );

  assistantForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = assistantInput.value.trim();
    if (!message) {
      return;
    }
    appendMessage("user", message);
    appendMessage("bot", getAssistantReply(message));
    assistantInput.value = "";
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.dataset.prompt;
      assistantInput.value = prompt;
      assistantInput.focus();
    });
  });
}

function initializeQuoteForm() {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(quoteForm);
    const ticket = `BGD-DEMO-${Math.floor(Math.random() * 9000 + 1000)}`;
    quoteSuccess.innerHTML = `
      <h3>Intake saved (demo)</h3>
      <p>Thanks, ${formData.get("name")}. Your request is tagged <strong>${ticket}</strong>.</p>
      <p>Preferred follow-up: <strong>${formData.get("followup")}</strong>. In a live rebuild, this would route to office triage with your builder summary.</p>
    `;
    quoteSuccess.classList.remove("hidden");
    quoteSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
    quoteForm.reset();
  });
}

function laneLabelAndClass(lane) {
  if (lane === "hot") {
    return { label: "Hot RFQ", className: "hot" };
  }
  if (lane === "incomplete") {
    return { label: "Incomplete", className: "incomplete" };
  }
  return { label: "Spam / noise", className: "spam" };
}

function showMailPreview(mailId) {
  const selected = mailData[mailId];
  if (!selected) {
    return;
  }
  const laneDisplay = laneLabelAndClass(selected.lane);

  mailPreview.innerHTML = `
    <p><span class="mail-pill ${laneDisplay.className}">${laneDisplay.label}</span></p>
    <h4>${selected.subject}</h4>
    <p><strong>From:</strong> ${selected.from}</p>
    <p>${selected.body}</p>
    <h4>Draft reply (shop voice)</h4>
    <p>${selected.draft}</p>
  `;

  if (selected.lane === "spam") {
    approveDraftButton.classList.add("hidden");
    approveNote.textContent = "No draft approval needed. Keep this in spam/noise.";
  } else {
    approveDraftButton.classList.remove("hidden");
    approveNote.textContent = "";
  }
}

function initializeMailTriage() {
  document.querySelectorAll(".mail-item").forEach((button) => {
    button.addEventListener("click", () => {
      showMailPreview(button.dataset.mailId);
    });
  });

  approveDraftButton.addEventListener("click", () => {
    approveNote.textContent = "Draft marked for human review and send approval (demo action).";
  });
}

initializeThemeToggle();
initializeBuilder();
initializeAssistant();
initializeQuoteForm();
initializeMailTriage();
