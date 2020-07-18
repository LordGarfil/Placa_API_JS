getData = async (placa) => {
  const url =
    "https://kyyva33hkl.execute-api.us-east-1.amazonaws.com/master/api/";
  const sendData = {
    operationName: "Plate",
    variables: {
      funnelType: "DESKTOP",
      applicationData: {
        vehicleRegistration: placa,
        identification: "111111",
        identificationType: "ID",
        insuranceCompany: "COLPA",
        gaCampaing: "(none)",
        gaContent: "(none)",
        gaSource: "(direct)",
        gaMedium: "(none)",
        gaLandingPage: "https://soat.grupor5.com/",
        gaKeyword: "(none)",
        utmCampaign: "SOAT",
        utmKeyword: "(none)",
        utmLandingPage:
          "https://soat.grupor5.com/soat3/?utm_source=ComparaOnline&utm_medium=web&utm_campaign=SOAT",
        utmMedium: "web",
        utmSource: "ComparaOnline",
        analyticsClientId: "476175861.1592364583",
      },
      funnelName: "soat3",
    },
    query:
      "mutation Plate($funnelType: FunnelTypeEnum, $applicationData: OdinApplicationType!, $funnelName: String) {\n  soatFunnel(funnelType: $funnelType, applicationData: $applicationData, funnelName: $funnelName) {\n    application {\n      id\n      vehicleBrandName\n      vehicleLineName\n      vehicleModel\n      vehicleRegistration\n      firstName\n      lastName\n      originalPrice\n      funnelName\n      __typename\n    }\n    nextStep\n    __typename\n  }\n}\n",
  };

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(sendData),
  })
  .catch(error => console.error('Error:', error))
  const data = await res.json();
  return data;
  //return data.data.soatFunnel.application
};

renderCards = async () => {
  /* const data = await getData()
    console.log(data); */
  const userDataSend = sendFormData();
  if (userDataSend <= 1) {
    if (userDataSend == 0) {
      sendWarningMessage("INGRESE 6 DIGITOS");
    } else if (userDataSend == 1) {
      sendWarningMessage("INGRESE SOLO 6 DIGITOS");
    }
  } else {
    const noFilterData = await getData(userDataSend);
    if (noFilterData.errors == undefined) {
        const filterData = noFilterData.data.soatFunnel.application
      setInfoCards(filterData);
    } else {
      sendErrorMessage("Placa Inválida");
    }
  }
};

setInfoCards = (objData = {}) => {
  const divCards = document.getElementById("output");
  divCards.innerHTML = `
    <div class="row row-cols-1 row-cols-md-3">
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">Line Name</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                ${objData.vehicleLineName}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">Brand Name</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            ${objData.vehicleBrandName}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">Model</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            ${objData.vehicleModel}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">Placa</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            ${objData.vehicleRegistration}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">First Name</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            ${objData.firstName}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <!-- <img src="" class="card-img-top" alt="..." /> -->
                        <div class="card-header bg-dark">
                            <h5 class="text-white">Last Name</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            ${objData.lastName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    `;
  $("#output").show();
};

sendFormData = () => {
  const placa = document.getElementById("txtPlaca").value.toUpperCase();
  if (placa.length == 6) {
    return placa;
  } else if (placa.length <= 5) {
    return 0;
  } else if (placa.length > 6) {
    return 1;
  }
};

sendWarningMessage = (Message = "") => {
  const alert = document.getElementById("messageAlert");
  alert.classList.add("alert-warning");
  alert.innerHTML = Message;
  $(alert).show(3000);
  setTimeout(() => {
    $(alert).hide();
  }, 1500);
};

sendErrorMessage = (Message = "") => {
    const alert = document.getElementById("messageAlert");
    alert.classList.add("alert-danger");
    alert.innerHTML = Message;
    $(alert).show(3000);
    setTimeout(() => {
      $(alert).hide();
    }, 1500);
  };

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  renderCards();
});

initializePage = () => {
  $("#output").hide();
  $("#messageAlert").hide();
};

window.onload = () => {
  //initializePage()
};
