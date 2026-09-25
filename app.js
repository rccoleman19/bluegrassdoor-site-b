(function () {
  "use strict";

  const body = document.body;
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
    body.classList.remove("menu-open");
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
      mobileMenu.hidden = !opening;
      body.classList.toggle("menu-open", opening);
      if (opening) mobileMenu.querySelector("a").focus();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      closeChat();
      closeLightbox();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1020) closeMenu();
  });

  const builderForm = document.getElementById("door-builder-form");
  const builderSteps = builderForm ? Array.from(builderForm.querySelectorAll(".builder-step")) : [];
  const builderBack = document.getElementById("builder-back");
  const builderNext = document.getElementById("builder-next");
  const builderError = document.getElementById("builder-error");
  const progressText = document.getElementById("builder-progress-text");
  const progressBar = document.getElementById("builder-progress-bar");
  const builderSummary = builderForm ? builderForm.querySelector(".builder-summary") : null;
  const summaryList = document.getElementById("builder-summary-list");
  const customSizeFields = builderForm ? builderForm.querySelector(".custom-size-fields") : null;
  const customWidth = document.getElementById("custom-width");
  const customHeight = document.getElementById("custom-height");
  let currentBuilderStep = 1;
  let finalBuilderSummary = "";

  function chosenValue(name) {
    const input = builderForm.querySelector('[name="' + name + '"]:checked');
    return input ? input.value : "";
  }

  function chosenHardware() {
    return Array.from(builderForm.querySelectorAll('[name="hardware"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function updateBuilderView() {
    builderSteps.forEach(function (step, index) {
      step.hidden = index + 1 !== currentBuilderStep;
    });
    if (builderSummary) builderSummary.hidden = true;
    if (builderBack) builderBack.disabled = currentBuilderStep === 1;
    if (builderNext) builderNext.textContent = currentBuilderStep === 4 ? "View Summary" : "Next";
    if (builderError) builderError.hidden = true;
    if (progressText) progressText.textContent = "Step " + currentBuilderStep + " of 4";
    if (progressBar) progressBar.style.width = (currentBuilderStep * 25) + "%";
  }

  function validateBuilderStep() {
    let valid = true;
    let message = "Please choose an option before continuing.";

    if (currentBuilderStep === 1 && !chosenValue("doorType")) valid = false;
    if (currentBuilderStep === 2 && !chosenValue("material")) valid = false;
    if (currentBuilderStep === 3) {
      const size = chosenValue("size");
      valid = Boolean(size);
      if (size === "Custom" && (!customWidth.value.trim() || !customHeight.value.trim())) {
        valid = false;
        message = "Please enter both a width and height for the custom opening.";
      }
    }
    if (currentBuilderStep === 4 && chosenHardware().length === 0) valid = false;

    if (!valid) {
      builderError.textContent = message;
      builderError.hidden = false;
      const step = builderSteps[currentBuilderStep - 1];
      const target = step.querySelector("input");
      if (target) target.focus();
    }
    return valid;
  }

  function sizeValue() {
    const size = chosenValue("size");
    if (size === "Custom") return "Custom: " + customWidth.value.trim() + " W × " + customHeight.value.trim() + " H";
    return size;
  }

  function renderBuilderSummary() {
    const details = [
      ["Door type", chosenValue("doorType")],
      ["Material", chosenValue("material")],
      ["Size", sizeValue()],
      ["Hardware", chosenHardware().join(", ")]
    ];
    summaryList.textContent = "";
    details.forEach(function (detail) {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const value = document.createElement("dd");
      term.textContent = detail[0];
      value.textContent = detail[1];
      row.append(term, value);
      summaryList.appendChild(row);
    });
    finalBuilderSummary = details.map(function (detail) { return detail[0] + ": " + detail[1]; }).join(" | ");
    builderSteps.forEach(function (step) { step.hidden = true; });
    builderSummary.hidden = false;
    builderError.hidden = true;
    document.querySelector(".builder-controls").hidden = true;
    progressText.textContent = "Complete";
    progressBar.style.width = "100%";
    builderSummary.querySelector("button").focus();
  }

  function resetBuilder() {
    if (!builderForm) return;
    builderForm.reset();
    currentBuilderStep = 1;
    finalBuilderSummary = "";
    if (customSizeFields) customSizeFields.hidden = true;
    document.querySelector(".builder-controls").hidden = false;
    updateBuilderView();
  }

  if (builderForm) {
    builderNext.addEventListener("click", function () {
      if (!validateBuilderStep()) return;
      if (currentBuilderStep < 4) {
        currentBuilderStep += 1;
        updateBuilderView();
        builderSteps[currentBuilderStep - 1].querySelector("legend").focus?.();
      } else {
        renderBuilderSummary();
      }
    });

    builderBack.addEventListener("click", function () {
      if (currentBuilderStep > 1) {
        currentBuilderStep -= 1;
        updateBuilderView();
      }
    });

    builderForm.addEventListener("change", function (event) {
      if (event.target.name === "size") {
        customSizeFields.hidden = event.target.value !== "Custom";
        if (event.target.value === "Custom") customWidth.focus();
      }
      if (event.target.name === "hardware" && event.target.value === "Not sure" && event.target.checked) {
        builderForm.querySelectorAll('[name="hardware"]:not([value="Not sure"])').forEach(function (input) { input.checked = false; });
      } else if (event.target.name === "hardware" && event.target.value !== "Not sure" && event.target.checked) {
        const unsure = builderForm.querySelector('[name="hardware"][value="Not sure"]');
        if (unsure) unsure.checked = false;
      }
      builderError.hidden = true;
    });

    document.querySelector(".reset-builder").addEventListener("click", resetBuilder);
    document.getElementById("use-builder-summary").addEventListener("click", function () {
      attachBuilderSummary(finalBuilderSummary);
      document.getElementById("quote").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () { document.getElementById("quote-name").focus(); }, 550);
    });
  }

  const quoteForm = document.getElementById("quote-form");
  const successPanel = document.getElementById("form-success");
  const attachedSummary = document.getElementById("attached-summary");
  const attachedSummaryText = document.getElementById("attached-summary-text");
  const summaryField = document.getElementById("builder-summary-field");

  function attachBuilderSummary(summary) {
    summaryField.value = summary;
    attachedSummaryText.textContent = summary;
    attachedSummary.hidden = false;
    const doorType = chosenValue("doorType");
    const projectSelect = document.getElementById("quote-project");
    if (doorType === "Flagpole") projectSelect.value = "Flagpole";
    else if (["Storefront / entrance", "Hollow metal / steel", "Fire-rated", "Security / safe room"].includes(doorType)) projectSelect.value = "Commercial / industrial";
    else if (["Interior swing", "Sliding barn"].includes(doorType)) projectSelect.value = "Residential";
  }

  function clearBuilderAttachment() {
    summaryField.value = "";
    attachedSummaryText.textContent = "";
    attachedSummary.hidden = true;
  }

  if (document.getElementById("remove-summary")) {
    document.getElementById("remove-summary").addEventListener("click", clearBuilderAttachment);
  }

  function quoteEmailBody(data) {
    const lines = [
      "Quote request for Bluegrass Commercial Door & More",
      "",
      "Name: " + data.get("name"),
      "Phone: " + data.get("phone"),
      "Email: " + data.get("email"),
      "Project type: " + data.get("projectType"),
      "Project city / location: " + data.get("location"),
      "Timeline: " + data.get("timeline"),
      "",
      "Project details:",
      data.get("details")
    ];
    if (data.get("doorFinderSummary")) lines.push("", "Door finder summary:", data.get("doorFinderSummary"));
    return lines.join("\n");
  }

  if (quoteForm) {
    const phoneField = document.getElementById("quote-phone");

    function validatePhone() {
      const digitCount = phoneField.value.replace(/\D/g, "").length;
      phoneField.setCustomValidity(phoneField.value.trim() && digitCount < 7 ? "Please enter a valid phone number." : "");
    }

    quoteForm.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field === phoneField) validatePhone();
        field.classList.add("was-checked");
      });
      field.addEventListener("input", function () {
        if (field === phoneField) validatePhone();
        if (field.checkValidity()) field.classList.remove("was-checked");
      });
    });

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validatePhone();
      const requiredFields = Array.from(quoteForm.querySelectorAll("[required]"));
      requiredFields.forEach(function (field) { field.classList.add("was-checked"); });
      if (!quoteForm.checkValidity()) {
        const firstInvalid = quoteForm.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = new FormData(quoteForm);
      const name = String(data.get("name")).trim();
      const subject = "Quote request from " + name + " — " + data.get("projectType");
      const mailto = "mailto:sonya@bluegrassdoor.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(quoteEmailBody(data));
      document.getElementById("send-email-link").href = mailto;
      document.getElementById("success-title").textContent = "Thanks, " + name + ". Your request details are ready.";
      quoteForm.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
    });

    document.getElementById("edit-request").addEventListener("click", function () {
      successPanel.hidden = true;
      quoteForm.hidden = false;
      document.getElementById("quote-name").focus();
    });
  }

  const chatToggle = document.querySelector(".chat-toggle");
  const chatPanel = document.getElementById("help-chat");
  const chatClose = document.querySelector(".chat-close");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  const chatReplies = {
    services: "We help with interior and exterior doors, commercial entrances and storefront glass, fire-rated and security doors, frames, hardware, partitions, accessories, and flagpoles for residential and commercial projects.",
    hours: "Business hours are not posted. Please call 270-780-3235 to schedule with our team.",
    area: "We’re based at 930 Gordon Avenue in Bowling Green and serve Warren County and the surrounding area.",
    emergency: "For a broken door or urgent repair need, please call 270-780-3235 right away so our team can discuss the situation with you.",
    quote: "You can use our Door Finder for a guided project summary, or go straight to the quote form. Which would you prefer?",
    contact: "Call 270-780-3235 or email sonya@bluegrassdoor.com. Our shop is at 930 Gordon Avenue in Bowling Green."
  };

  function openChat() {
    if (!chatPanel) return;
    chatPanel.hidden = false;
    chatToggle.setAttribute("aria-expanded", "true");
    chatToggle.setAttribute("aria-label", "Close Bluegrass Door Help");
    chatClose.focus();
  }

  function closeChat() {
    if (!chatPanel || chatPanel.hidden) return;
    chatPanel.hidden = true;
    chatToggle.setAttribute("aria-expanded", "false");
    chatToggle.setAttribute("aria-label", "Open Bluegrass Door Help");
  }

  function appendChat(text, type) {
    const message = document.createElement("div");
    message.className = "chat-message " + type;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function replyToChat(topic, userText) {
    if (userText) appendChat(userText, "outgoing");
    window.setTimeout(function () {
      appendChat(chatReplies[topic] || "We’d be glad to help. Call 270-780-3235 or email sonya@bluegrassdoor.com so our team can answer your question.", "incoming");
      if (topic === "quote") {
        const actions = document.createElement("div");
        actions.className = "chat-message incoming";
        actions.innerHTML = '<a href="#door-builder">Open Door Finder</a> &nbsp;·&nbsp; <a href="#quote">Open quote form</a>';
        chatMessages.appendChild(actions);
        actions.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeChat); });
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 180);
  }

  function identifyChatTopic(text) {
    const question = text.toLowerCase();
    if (/hour|open|close|schedule|appointment/.test(question)) return "hours";
    if (/emergency|broken|stuck|urgent|repair/.test(question)) return "emergency";
    if (/area|serve|location|where|county|bowling green/.test(question)) return "area";
    if (/quote|estimate|cost|price|builder|finder/.test(question)) return "quote";
    if (/contact|phone|call|email|address/.test(question)) return "contact";
    if (/service|door|frame|hardware|glass|flag|partition/.test(question)) return "services";
    return "other";
  }

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener("click", function () { chatPanel.hidden ? openChat() : closeChat(); });
    chatClose.addEventListener("click", function () { closeChat(); chatToggle.focus(); });
    document.querySelectorAll("[data-chat]").forEach(function (button) {
      button.addEventListener("click", function () { replyToChat(button.dataset.chat, button.textContent); });
    });
    document.getElementById("chat-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const text = chatInput.value.trim();
      if (!text) { chatInput.focus(); return; }
      chatInput.value = "";
      replyToChat(identifyChatTopic(text), text);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  let previousLightboxTrigger = null;

  function openLightbox(button) {
    previousLightboxTrigger = button;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.dataset.alt;
    lightboxCaption.textContent = button.dataset.alt;
    lightbox.hidden = false;
    body.classList.add("modal-open");
    lightbox.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    body.classList.remove("modal-open");
    if (previousLightboxTrigger) previousLightboxTrigger.focus();
  }

  document.querySelectorAll(".gallery-item").forEach(function (button) {
    button.addEventListener("click", function () { openLightbox(button); });
  });
  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) { if (event.target === lightbox) closeLightbox(); });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
