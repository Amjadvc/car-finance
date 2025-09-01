function setupModalHandlers(openBtn, container, content, closeBtn) {
  const openButton = document.querySelector(`[data-target="${openBtn}"]`);
  const modalContainer = document.querySelector(`[data-target="${container}"]`);
  const modalContent = document.querySelector(`[data-target="${content}"]`);
  const closeButton = document.querySelector(`[data-target="${closeBtn}"]`);

  // Open modal
  openButton.addEventListener("click", () => {
    modalContainer.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("hidden");
    }, 200);
  });

  // Close modal
  closeButton.addEventListener("click", () => {
    modalContent.classList.add("animate-fade-out");
    setTimeout(() => {
      modalContent.classList.remove("animate-fade-out");
      modalContent.classList.add("hidden");
      modalContainer.classList.add("hidden");
    }, 300);
  });
}

setupModalHandlers("adBtn", "adContainer", "adData", "closeAd");
setupModalHandlers("termsBtn", "termsContainer", "termsData", "closeterms");

//handel dob show label
const BirthSt = document.querySelector("#stepBirth");
const birthInpHolder = document.querySelector(".birth-inp-holder");
const birthLabel = BirthSt.querySelector(".birth-label");
const dobInputs = document.querySelectorAll(".inp-ineer input");

dobInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    birthLabel.classList.remove("label-data");
    birthLabel.classList.add("active");
    birthInpHolder.classList.add("active");
  });
});

function initializeInputs() {
  const inputsAnimat = document.querySelectorAll(".input-holder-animat input");

  // Initialize inputs based on their current value
  inputsAnimat.forEach((input) => {
    if (input.value !== "") {
      input.classList.add("label-data");
    } else {
      input.classList.remove("label-data");
    }
  });

  inputsAnimat.forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.remove("label-data");
      input.classList.add("active");
    });
  });

  inputsAnimat.forEach((input) => {
    input.addEventListener("blur", () => {
      const anyFocused = input.classList.contains("active");
      const anyData = input.value !== "";
      if (anyFocused) {
        input.classList.remove("active");
        if (anyData) {
          input.classList.add("label-data");
        } else {
          input.classList.remove("label-data");
        }
      }
    });
  });
}

initializeInputs();

// Re-run the function when the page is shown  navigating back
window.addEventListener("pageshow", initializeInputs);

dobInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    // Check if any input is still focused
    const anyFocused = Array.from(dobInputs).some(
      (inp) => inp === document.activeElement
    );
    const anyData = Array.from(dobInputs).some((inp) => inp.value !== "");
    if (!anyFocused) {
      birthLabel.classList.remove("label-data", "active");
      birthInpHolder.classList.remove("active");

      if (anyData) {
        birthLabel.classList.add("label-data");
      } else {
        birthLabel.classList.remove("label-data");
      }
    }
  });
});

//handel focusbg for BTNS
const INPUTS_BTN = document.querySelectorAll("[data-focusbg]");

INPUTS_BTN.forEach((label) => {
  label.addEventListener("click", function (eve) {
    label.classList.add("focusbg");
    eve.stopPropagation();
  });
});

document.addEventListener("click", function (eve) {
  INPUTS_BTN.forEach((label) => {
    if (!label.contains(eve.target)) {
      label.classList.remove("focusbg");
    }
  });
});

const allSteps = Array.from(document.querySelectorAll(".step"));
let currentStep = allSteps.find((step) => !step.classList.contains("hidden"));
let currentIndex = allSteps.indexOf(currentStep);
const backBtns = document.querySelectorAll("#prevBtn");
const history = [];
const progressBar = document.querySelector("[data-progress-bg]");

// Update progress bar
function updateProgressBar() {
  let progressPercentage = Math.floor(
    (currentIndex / (allSteps.length - 1)) * 100
  );
  progressBar.style.width = `${progressPercentage}%`;
}

// Move to a specific step
function moveToNextStep(stepId) {
  const nextStep = allSteps.find((step) => step.id === stepId);

  if (!nextStep) return;

  history.push(currentIndex);

  currentIndex = allSteps.indexOf(nextStep);
  // currentStep.classList.remove("fade-leav");
  currentStep.classList.add("fade-leav");

  setTimeout(() => {
    currentStep.classList.add("hidden");
    currentStep.classList.remove("fade-leav");
    currentStep = nextStep;
  }, 300);
  setTimeout(() => {
    nextStep.classList.remove("hidden");
  }, 300);

  updateProgressBar();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Handle back navigation
backBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (history.length > 0) {
      const previousIndex = history.pop();
      currentStep.classList.add("fade-leav");

      setTimeout(() => {
        currentStep.classList.add("hidden");
        currentStep.classList.remove("fade-leav");
        currentIndex = previousIndex;
        currentStep = allSteps[currentIndex];
      }, 300);

      setTimeout(() => {
        currentStep.classList.remove("hidden");
      }, 300);

      updateProgressBar();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// ================ handel  swap steps ================
const allStepBtns = document.querySelectorAll("[data-next]");

allStepBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const nextStepId = this.getAttribute("data-next");
    moveToNextStep(nextStepId);
  });
});

const setError = (element, message, closestEle = ".inputs-contianer") => {
  const inputcontainer = element.closest(closestEle);
  const errorDisplay = inputcontainer.querySelector("[ error='error']");

  errorDisplay.innerText = message;
  errorDisplay.classList.add("active-error");
  element.classList.add("error");
};

const setSuccess = (element, closestEle = ".inputs-contianer") => {
  const inputcontainer = element.closest(closestEle);
  const errorDisplay = inputcontainer.querySelector("[ error='error']");
  errorDisplay.innerText = "";
  element.classList.remove("error");
  errorDisplay.classList.remove("active-error");
};

function limetNumber(e, n) {
  if (e.target.value.length > n) {
    e.target.value = e.target.value.slice(0, n);
  }
}
function justNumber(e) {
  e.target.value = e.target.value.replace(/\D/g, "");
}

function formatNumber(ele) {
  let rawValue = ele.value.replace(/[^0-9]/g, "");
  rawValue = rawValue.slice(0, 6);
  const formattedValue = new Intl.NumberFormat("en-US").format(rawValue);
  ele.value = formattedValue;
}

function formatPhoneNumber() {
  let input = phoneInp.value.replace(/\D/g, "");
  let formattedNumber = "";

  formattedNumber = input.length > 0 ? "(" + input.slice(0, 3) : "";
  formattedNumber += input.length > 3 ? ")-" + input.slice(3, 6) : "";
  formattedNumber += input.length > 6 ? "-" + input.slice(6, 10) : "";

  phoneInp.value = formattedNumber;
}

// ==================Birth==================
const summitBirth = BirthSt.querySelector("[data-next-form]");
const dayInp = document.querySelector("#dobDayInp");
const monthInp = document.querySelector("#dobMonthInp");
const yearInp = document.querySelector("#dobYearInp");

dayInp.addEventListener("input", function () {
  if (dayInp.value.length == 2) {
    dayInp.blur();
    monthInp.focus();
  }
});

monthInp.addEventListener("input", function () {
  if (monthInp.value.length == 2) {
    monthInp.blur();
    yearInp.focus();
  }
});

dayInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});

monthInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});
yearInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 4);
});

summitBirth.addEventListener("click", function () {
  if (validateStepBirth()) {
    moveToNextStep("stepAddress");
  }

  dayInp.addEventListener("input", validateStepBirth);
  monthInp.addEventListener("input", validateStepBirth);
  yearInp.addEventListener("input", validateStepBirth);
});

const validateStepBirth = () => {
  const dayValue = dayInp.value.trim();
  const monthValue = monthInp.value.trim();
  const yearValue = yearInp.value.trim();

  const numbersRegex = /^\d+$/;

  if (dayValue === "" && monthValue === "" && yearValue === "") {
    setError(dayInp, "Please enter your date of birth.");
    return false;
  }

  if (
    dayValue === "" ||
    !numbersRegex.test(dayValue) ||
    parseInt(dayValue) < 1 ||
    parseInt(dayValue) > 31
  ) {
    setError(dayInp, "Please enter a day between 1 and 31.");
    return false;
  }

  if (monthValue === "" || !numbersRegex.test(monthValue)) {
    setError(monthInp, "What month were you born?");
    return false;
  } else if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12) {
    setError(monthInp, "Please enter a month between 1 and 12.");
    return false;
  }

  if (yearValue === "" || !numbersRegex.test(yearValue)) {
    setError(yearInp, "What year were you born?");
    return false;
  } else if (parseInt(yearValue) < 1900 || parseInt(yearValue) > 2010) {
    setError(yearInp, "Please enter a valid year");
    return false;
  }

  setSuccess(dayInp);
  setSuccess(monthInp);
  setSuccess(yearInp);
  return true;
};

// ==================stepAddress==================
const showError = (ele, message) => {
  const inputcontainer = ele.closest(".inputs-contianer");
  const errorDisplay = inputcontainer.querySelector("[ error='error']");
  errorDisplay.innerText = message;
  ele.classList.add("error");
  errorDisplay.classList.add("active-error");
};

const hideError = (ele) => {
  const inputcontainer = ele.closest(".inputs-contianer");
  const errorDisplay = inputcontainer.querySelector("[ error='error']");
  errorDisplay.innerText = "";
  ele.classList.remove("error");
  errorDisplay.classList.remove("active-error");
};

// handle show  more address Inpts
const showMoreAddressInpBtn = document.querySelector("#showMoreAddressInp");
const leftAddressInputs = document.querySelector(".left-address-inputs");

leftAddressInputs.style.display = "none";

showMoreAddressInpBtn.addEventListener("click", () => {
  showMoreAddressInpBtn.classList.add("fade-out");

  setTimeout(() => {
    showMoreAddressInpBtn.style.display = "none";
    leftAddressInputs.style.display = "flex";
    leftAddressInputs.classList.add("fade-in");
    showMoreAddressInpBtn.classList.remove("fade-out");
  }, 200);
});

// handle autocomplete address
function initMap() {
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("gm-autocomplete"),
    {
      types: ["geocode"],
      componentRestrictions: { country: "CA" }, // Restrict results to Canada
    }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      console.log("No details available for input: '" + place.name + "'");
      return;
    }

    document.getElementById("showMoreAddressInp").click();

    const addressComponents = place.address_components;
    let streetNumber = "";
    let street = "";
    let city = "";
    let province = "";
    let postalCode = "";

    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number":
          streetNumber = component.long_name;
          break;
        case "route":
          street = component.long_name;
          break;
        case "locality":
          city = component.long_name;
          break;
        case "administrative_area_level_1":
          province = component.short_name;
          break;
        case "postal_code":
          postalCode = component.long_name;
          break;
      }
    });

    const streetAddressInput = document.getElementById("streetAddress");
    const cityInput = document.getElementById("city");
    const provinceInput = document.getElementById("province");
    const postalCodeInput = document.getElementById("postal_code");

    streetAddressInput.value = `${streetNumber} ${street}`.trim();
    cityInput.value = city;
    provinceInput.value = province;
    postalCodeInput.value = postalCode;

    // Check if any required fields are empty
    if (
      !streetAddressInput.value ||
      !cityInput.value ||
      !provinceInput.value ||
      !postalCodeInput.value
    ) {
      // Click the button to show more address inputs
      document.getElementById("showMoreAddressInp").click();
    } else {
      // Proceed with validation if all fields are filled
      validateAddressDetails();
    }
  });
}

// Step 10 validation
const stepAddress = document.querySelector("#stepAddress");
const submitButton10 = stepAddress.querySelector("[data-next-form]");
const streetAddressInp = document.querySelector("#streetAddress");
const cityInp = document.querySelector("#city");
const provinceInp = document.querySelector("#province");
const postalCodeInp = document.querySelector("#postal_code");
const zipRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

postalCodeInp.addEventListener("input", (e) => {
  const inputVal = e.target.value;

  if (inputVal.replace(/\s/g, "").length > 6) {
    e.target.value = inputVal.slice(0, 7); // Max of 6 characters + space
  }
});

submitButton10.addEventListener("click", function () {
  if (validateAddressDetails()) {
    moveToNextStep("livingStatus");
    let formattedAddress = `${streetAddressInp.value.trim()}, ${cityInp.value.trim()}, ${provinceInp.value.trim()} ${postalCodeInp.value.trim()}`;
    setAddressHistoryHeader(formattedAddress);
  }

  streetAddressInp.addEventListener("input", validateAddressDetails);
  cityInp.addEventListener("input", validateAddressDetails);
  postalCodeInp.addEventListener("input", validateAddressDetails);
});

const validateAddressDetails = () => {
  let isValid = true;

  if (streetAddressInp.value.trim() === "") {
    showError(streetAddressInp, "Please fill above field correctly.");
    isValid = false;
  } else {
    hideError(streetAddressInp);
  }

  if (cityInp.value.trim() === "") {
    showError(cityInp, "Please fill above field correctly.");
    isValid = false;
  } else {
    hideError(cityInp);
  }

  if (!zipRegex.test(postalCodeInp.value)) {
    showError(postalCodeInp, "Please fill above field correctly.");
    isValid = false;
  } else {
    hideError(postalCodeInp);
  }

  return isValid;
};

// ===================addressHistory===================
const addressHistorySt = document.querySelector("#addressHistory");
const submitddressHistory = addressHistorySt.querySelector("[data-next-form]");
const yearsAtAddressHisInp = document.querySelector("#yearsAtAddressHistory");
const monthsAtAddressHisInp = document.querySelector("#monthsAtAddressHistory");
const addressHistoryHeader = addressHistorySt.querySelector(".step-header h2");
const addressHistoryPrvBtn = addressHistorySt.querySelector("#prevBtn");

function setAddressHistoryHeader(address) {
  let addressHistoryHeaderText = `How long have you lived at ${address}?`;
  addressHistoryHeader.innerHTML = addressHistoryHeaderText;
}

monthsAtAddressHisInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});
yearsAtAddressHisInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});

submitddressHistory.addEventListener("click", function () {
  if (validateaddressHistory()) {
    moveToNextStep("employmentStatus");
  }

  yearsAtAddressHisInp.addEventListener("input", validateaddressHistory);
  monthsAtAddressHisInp.addEventListener("input", validateaddressHistory);
});

const validateaddressHistory = () => {
  const yearsAtAddressHisValue = yearsAtAddressHisInp.value.trim();
  const monthsAtAddressHisValue = monthsAtAddressHisInp.value.trim();

  if (
    (yearsAtAddressHisValue === "" || yearsAtAddressHisValue == 0) &&
    (monthsAtAddressHisValue === "" || monthsAtAddressHisValue == 0)
  ) {
    setError(
      yearsAtAddressHisInp,
      "Please tell us how long you've lived here."
    );
    return false;
  }

  if (
    parseInt(yearsAtAddressHisValue) < 0 ||
    parseInt(yearsAtAddressHisValue) > 80
  ) {
    setError(
      yearsAtAddressHisInp,
      "Please enter a number between 0 and 80 years."
    );
    return false;
  }

  if (
    parseInt(monthsAtAddressHisValue) < 0 ||
    parseInt(monthsAtAddressHisValue) > 11
  ) {
    setError(
      yearsAtAddressHisInp,
      "Please enter a number between 0 and 11 months."
    );
    return false;
  }

  setSuccess(yearsAtAddressHisInp);
  return true;
};

// ==================employmentStatus==================
const employmentStatusSt = document.querySelector("#employmentStatus");
const employmentStatusInputs = employmentStatusSt.querySelectorAll("input");
let employmentStatus = "";
employmentStatusInputs.forEach((inp) => {
  inp.addEventListener("click", function () {
    employmentStatus = inp.value;

    sessionStorage.setItem("employmentStatus", employmentStatus);
    handleJobTitleSection(employmentStatus);
    handleHeaderDur();
  });
});

// ==================jobTitle==================
const jobTitleSt = document.querySelector("#jobTitle");
const submitjobTitle = jobTitleSt.querySelector("[data-next-form]");
const empOccupationInp = document.querySelector("#employmentsOccupation");
const empNameInp = document.querySelector("#employerName");
const empTownInp = document.querySelector("#employerTown");
const empNameInpParent = empNameInp.closest(".inputs-contianer");
const empTownInpParent = empTownInp.closest(".inputs-contianer");
const empTownLabel = empTownInpParent.querySelector(".input-label");

function handleJobTitleSection(status) {
  empNameInpParent.classList.add("hidden");
  empTownLabel.innerHTML = "Town";
  if (status === "Full-time" || status === "Part-time") {
    empNameInpParent.classList.remove("hidden");
    empTownLabel.innerHTML = "Where is your workplace based?";
  }
}

submitjobTitle.addEventListener("click", function () {
  if (validatejobTitl()) {
    sessionStorage.setItem("employName", empNameInp.value);
    handleHeaderDur();
    moveToNextStep("employedDuration");
  }

  empOccupationInp.addEventListener("input", validatejobTitl);
  empNameInp.addEventListener("input", validatejobTitl);
  empTownInp.addEventListener("input", validatejobTitl);
});

const validatejobTitl = () => {
  let isValid = true;

  const empOccupationInpValue = empOccupationInp.value.trim();
  const empNameInpValue = empNameInp.value.trim();
  const empTownInpValue = empTownInp.value.trim();

  if (empOccupationInpValue === "") {
    setError(empOccupationInp, "Please tell us what you do for a job.");
    isValid = false;
  } else {
    setSuccess(empOccupationInp);
  }

  if (!empNameInpParent.classList.contains("hidden")) {
    if (empNameInpValue === "") {
      setError(empNameInp, "Please tell us who you work for.");
      isValid = false;
    } else {
      setSuccess(empNameInp);
    }
  }
  if (empTownInpValue === "") {
    setError(empTownInp, "Please tell us which town you work in.");
    isValid = false;
  } else {
    setSuccess(empTownInp);
  }

  return isValid;
};

// ==================employedDuration==================
const employedDurationSt = document.querySelector("#employedDuration");
const submitEmpDuration = employedDurationSt.querySelector("[data-next-form]");
const prevEmpDuration = employedDurationSt.querySelector("#prevBtn");
const yearsAtEmpDurInp = document.querySelector("#yearsAtEmployerDuration");
const monthsAtEmpDurInp = document.querySelector("#monthsAtEmployerDuration");
const empDurationHeader = employedDurationSt.querySelector(".step-header h2");

function handleHeaderDur() {
  let message = "";
  let employName = sessionStorage.getItem("employName");
  let statusData = sessionStorage.getItem("employmentStatus");

  if (statusData !== "Full-time" && statusData !== "Part-time") {
    message = `How long have you been a ${statusData.toLowerCase()}?`;
  } else {
    message = `How long have you worked at ${employName}?`;
  }
  empDurationHeader.innerHTML = message;
}

prevEmpDuration.addEventListener("click", () => {
  const inputcontainer = yearsAtEmpDurInp.closest(".inputs-contianer");
  const errorDisplay = inputcontainer.querySelector("[ error='error']");
  errorDisplay.innerHTML = "";
});

monthsAtEmpDurInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});
yearsAtEmpDurInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});

submitEmpDuration.addEventListener("click", function () {
  if (validateEmpDuration()) {
    moveToNextStep("monthlyIncomeStep");
  }

  yearsAtEmpDurInp.addEventListener("input", validateEmpDuration);
  monthsAtEmpDurInp.addEventListener("input", validateEmpDuration);
});

const validateEmpDuration = () => {
  const yearsAtEmpDurValue = yearsAtEmpDurInp.value.trim();
  const monthsAtEmpDurValue = monthsAtEmpDurInp.value.trim();
  let errorM1 = `Please tell us how long you've worked at this job.`;
  let errorM2 = `Please tell us how long have you been ${employmentStatus.toLowerCase()}?`;
  let errorMessage =
    employmentStatus !== "Full-time" && employmentStatus !== "Part-time"
      ? errorM2
      : errorM1;

  if (
    (yearsAtEmpDurValue === "" || yearsAtEmpDurValue == 0) &&
    (monthsAtEmpDurValue === "" || monthsAtEmpDurValue == 0)
  ) {
    setError(yearsAtEmpDurInp, errorMessage);
    return false;
  }

  if (parseInt(yearsAtEmpDurValue) < 0 || parseInt(yearsAtEmpDurValue) > 80) {
    setError(yearsAtEmpDurInp, "Please enter a number between 0 and 80 years.");
    return false;
  }

  if (parseInt(monthsAtEmpDurValue) < 0 || parseInt(monthsAtEmpDurValue) > 11) {
    setError(
      yearsAtEmpDurInp,
      "Please enter a number between 0 and 11 months."
    );
    return false;
  }

  setSuccess(yearsAtEmpDurInp);
  return true;
};

// ==================monthlyIncomeStep==================
const monthlyIncomeStep = document.querySelector("#monthlyIncomeStep");
const submitMonthlyIncome = monthlyIncomeStep.querySelector("[data-next-form]");
const prevMonthlyIncome = monthlyIncomeStep.querySelector("#prevBtn");
const errorMMonthlyIncome = monthlyIncomeStep.querySelector(".error-holder");
const monthlyIncomeInp = document.querySelector("#monthlyIncomeInp");

monthlyIncomeInp.addEventListener("input", function () {
  formatNumber(monthlyIncomeInp);
});

prevMonthlyIncome.addEventListener("click", function () {
  errorMMonthlyIncome.innerHTML = "";
});

submitMonthlyIncome.addEventListener("click", function () {
  if (validateMonthlyIncome()) {
    moveToNextStep("loanAmountStep");
  }

  monthlyIncomeInp.addEventListener("input", validateMonthlyIncome);
});

const validateMonthlyIncome = () => {
  const monthlyIncomeInpValue = monthlyIncomeInp.value.trim().replace(/,/g, "");
  const incomeNumber = Number(monthlyIncomeInpValue);

  let makeValid = false;
  if (
    employmentStatus === "Full-time" ||
    employmentStatus === "Self-employed" ||
    employmentStatus === "Part-time"
  ) {
    makeValid = true;
  }

  let isValid = true;

  if (makeValid) {
    if (incomeNumber === 0) {
      setError(
        monthlyIncomeInp,
        "Let us know your monthly income to continue."
      );
      isValid = false;
    } else if (incomeNumber > 10000) {
      setError(
        monthlyIncomeInp,
        "This looks quite high. Please enter the monthly income you take home after tax."
      );
      isValid = false;
    } else if (incomeNumber < 100) {
      setError(
        monthlyIncomeInp,
        "Please check this includes your wage, benefits and pension after tax that you receive every month."
      );
      isValid = false;
    } else {
      setSuccess(monthlyIncomeInp);
    }
  } else {
    if (incomeNumber > 10000) {
      setError(
        monthlyIncomeInp,
        "This looks quite high. Please enter the monthly income you take home after tax."
      );
      isValid = false;
    } else {
      setSuccess(monthlyIncomeInp);
    }
  }

  return isValid;
};

// ==================loanAmountStep==================

const loanAmountStep = document.querySelector("#loanAmountStep");
const submitloanAmount = loanAmountStep.querySelector("[data-next-form]");
const loanAmountInp = document.querySelector("#loanAmountInp");

loanAmountInp.addEventListener("input", function () {
  formatNumber(loanAmountInp);
});

submitloanAmount.addEventListener("click", function () {
  if (validateLoanAmount()) {
    moveToNextStep("nameStep");
  }
  loanAmountInp.addEventListener("input", validateLoanAmount);
});

const validateLoanAmount = () => {
  const loanAmountInpValue = loanAmountInp.value.trim().replace(/,/g, "");
  const loanAmountNumber = Number(loanAmountInpValue);

  let isValid = true;
  if (loanAmountNumber === 0 && loanAmountInp.value.trim() !== "") {
    setError(loanAmountInp, "The minimum amount you can borrow is $1");
    isValid = false;
  } else {
    setSuccess(loanAmountInp);
  }

  return isValid;
};

// ==================nemeStep==================
const nameStep = document.querySelector("#nameStep");
const submitNameStep = nameStep.querySelector("[data-next-form]");
const firstNameInp = document.querySelector("#firstName");
const lastNameInp = document.querySelector("#lastName");
const salutationMrInp = document.querySelector("#salutationMr");
const salutationRadioBtns = nameStep.querySelectorAll(
  "input[name='salutationtitle']"
);

submitNameStep.addEventListener("click", function () {
  if (validateName()) {
    moveToNextStep("sendQuote");
  }

  firstNameInp.addEventListener("input", validateName);
  lastNameInp.addEventListener("input", validateName);

  salutationRadioBtns.forEach((radio) => {
    radio.addEventListener("input", validateName);
  });
});

const validateName = () => {
  let isValid = true;
  const firstNameValue = firstNameInp.value.trim();
  const lastNameValue = lastNameInp.value.trim();

  if (firstNameValue === "") {
    setError(firstNameInp, "Please enter your first name.");
    isValid = false;
  } else {
    setSuccess(firstNameInp);
  }

  if (lastNameValue === "") {
    setError(lastNameInp, "Please enter your last name.");
    isValid = false;
  } else {
    setSuccess(lastNameInp);
  }

  //salutationSelected
  let salutationSelected = nameStep.querySelector(
    "input[name='salutationtitle']:checked"
  );
  if (!salutationSelected) {
    setError(
      salutationMrInp,
      "Please choose an option to continue.",
      ".Name-step-layout"
    );
    isValid = false;
  } else {
    setSuccess(salutationMrInp, ".Name-step-layout");
  }

  return isValid;
};

// ==================sendQuote==================
const sendQuote = document.querySelector("#sendQuote");
const submitsendQuote = sendQuote.querySelector("[data-next-form]");
const emailInp = document.querySelector("#emailInp");
const phoneInp = document.querySelector("#contactNumberInp");
const consentInp = document.querySelector("#consent");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phonRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

phoneInp.addEventListener("input", formatPhoneNumber);

submitsendQuote.addEventListener("click", function () {
  if (validiteForm()) {
  }

  emailInp.addEventListener("input", validiteForm);
  phoneInp.addEventListener("input", validiteForm);
  consentInp.addEventListener("input", validiteForm);
});

const validiteForm = () => {
  let emailInpValue = emailInp.value.trim();
  let phoneInpValue = phoneInp.value.trim();
  let consentChecked = consentInp.checked;

  let isEmailValid = emailRegex.test(emailInpValue);
  let isPhoneValid = phonRegex.test(phoneInpValue);

  let isValid = true;

  if (emailInpValue === "") {
    setError(emailInp, "Please enter an email address.");
    isValid = false;
  } else if (isEmailValid === false) {
    setError(
      emailInp,
      "Please try again.That email address doesn't look right."
    );
    isValid = false;
  } else {
    setSuccess(emailInp);
  }

  if (phoneInpValue === "") {
    setError(phoneInp, "Please enter a phone number.");
    isValid = false;
  } else if (isPhoneValid === false) {
    setError(
      phoneInp,
      "Please try again. That phone number doesn't look right."
    );
    isValid = false;
  } else {
    setSuccess(phoneInp);
  }

  if (!consentChecked) {
    setError(
      consentInp,
      "Please agree to the T&amp;Cs to get your quote.",
      ".terms-holder"
    );
    isValid = false;
  } else {
    setSuccess(consentInp, ".terms-holder");
  }

  return isValid;
};

// ==================submitForm==================

const form = document.querySelector("#surveyForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validiteForm()) return validiteForm;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  setTimeout(() => {
    window.location.href = "thanks.html";
  }, 1000);

  // fetch("", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: jsonData,
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("Success:", data);
  //     setTimeout(() => {
  //       window.location.href = "thanks.html";
  //     }, 200);
  //   })
  //   .catch((error) => {
  //     console.error("There was a problem with the fetch operation:", error);
  //   });
});
