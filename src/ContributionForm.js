import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./styles/SpendForm.module.css";
import { v4 as uuidv4 } from 'uuid';

function ContributionForm() {
  const domainUrl = "budget-api.cloud.jdplc.com";
  const port = "443";
  const httpStatus = "https";
  const [data, setData] = useState();
  const myRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [initialState, setInitialState] = useState([{
    id: uuidv4(),
    formType: "Contribution Form",
    spend_submitted_by: "",
    fascia: "",
    brand: "",
    department: "",
    spend_detail: "",
    campaign_type: "",
    net_value: "",
    confirmed: false
  }])
  const [forms, setForms] = useState([
    {
      id: uuidv4(),
      formType: "Contribution Form",
    spend_submitted_by: "",
    fascia: "",
    brand: "",
    department: "",
    spend_detail: "",
    campaign_type: "",
    net_value: "",
    confirmed: false
    }
  ]);
  const addForms = () => {
    setForms([
      ...forms,
      {
        id: uuidv4(),
        formType: "Contribution Form",
      spend_submitted_by: "",
      fascia: "",
      brand: "",
      department: "",
      spend_detail: "",
      campaign_type: "",
      net_value: "",
      confirmed: false
      },
    ]
    );
};
  
  const clearAll = () => {
    setForms(initialState)
  }



  const handleChangeInput = (id, event) => {
    const newInputFields = forms.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setForms(newInputFields)
  }
  const handleChangeCheckBox = (id, event) => {
    const newInputFields = forms.map(i => {
      if(id === i.id) {
        const value = i[event.target.name]
        i[event.target.name] = !value
        // i[event.target.name] = event.target.value

      }
      return i;
    })
    setForms(newInputFields)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(forms)
    placeOrderHandler(forms);
  };
  const placeOrderHandler = async (info) => {
    console.log(info);
    info.forEach(i => {
      const postingData = async (info) => {
        console.log(info)
        try {
          const { data } = await axios.post("http://localhost:4000/contribution-form", {
            id: info.id,
            formType: info.formType,
            spend_submitted_by: info.spend_submitted_by,
            fascia: info.fascia,
            brand: info.brand,
            department: info.department,
            spend_detail: info.spend_detail,
            campaign_type: info.campaign_type,
            net_value: info.net_value,
            confirmed: info.confirmed
          });
          console.log(data);
        } catch (err) {
          alert(err.response.data.error);
          console.log(err);
        }
      }
      postingData(i)
      
    })
    clearAll()
  };
  async function getReference() {
    try {
      const res = await axios.get(
        `${httpStatus}://${domainUrl}:${port}/api/reference-lists`
      );
      const data = res.data;
      setData(data);
      console.log(data);

    } catch (err) {
      alert(
        `Unable to retrive data. API may need waking up, please contact Janusz Wozniak <Janusz.Wozniak@jdplc.com>: ${err}`
      );
      return err;
    }
  }
  useEffect(() => {
    getReference();

  }, []);

  if (!data) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.form}>
        <div className={styles.main_title}>
          <h1>Contribution form</h1>
          <div className={styles.fancy_line}></div>
        </div>
        <div className={styles.button_container}>
          <button
          onClick={handleSubmit}
          >
            Submit
          </button>
          <button
          onClick={addForms}
          >
            Add New Form
          </button>
          <button
          onClick={clearAll}
          >Clear</button>
        </div>
        <form
        ref={myRef}
        onSubmit={handleSubmit}
        >
          {forms.map((form) => (
            <div>
            <div className={styles.mainFormContainer} key={form.id}>
              <section className={styles.formContainer}>
                <label htmlFor="spend_submitted_by">Submitted By</label>
                <input id="spend_submitted_by"           
                name="spend_submitted_by"
              label="spend_submitted_by"
              variant="filled"
              placeholder="Submitted By"
              value={form.spend_submitted_by}
              onChange={event => handleChangeInput(form.id, event)}
                  />
              </section>

              <section className={styles.formContainer}>
                <label htmlFor="fascia">Fascia</label>

                <input
                  id="fascia"
                  name="fascia"
                  placeholder="Fascia"
                  value={form.fascia}
                  variant="filled"
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              
              <section className={styles.formContainer}>
                <label htmlFor="brand">Brand</label>
                <select
                  id="brand"
                  name="brand"
                  value={form.brand}
                  required
                  onChange={event => handleChangeInput(form.id, event)}

                >
                                    <option value="" disabled selected>Select Brand</option>

                  {data ? (
                    data[0].reference_list.map(function (item, i) {
                      return <option key={i}>{item}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </select>
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  required
                  onChange={event => handleChangeInput(form.id, event)}
                >
                                    <option value="" disabled selected>Select Department</option>

                  {data ? (
                    data[4].reference_list.map(function (item, i) {
                      return <option key={i}>{item}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </select>
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spend_detail">
                Spend Detail
                </label>

                <input
                  id="spend_detail"
                  name="spend_detail"
                  placeholder="Spend Detail"
                  value={form.spend_detail}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="campaign_type">Campaign Type</label>
                <select
                  id="campaign_type"
                  name="campaign_type"
                  value={form.campaign_type}
                  onChange={event => handleChangeInput(form.id, event)}

                >
                                    <option value="" disabled selected>Select Campaign Type</option>

                  {data ? (
                    data[1].reference_list.map(function (item, i) {
                      return <option key={i}>{item}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                  <option>Bottomline Profit</option>
                </select>
              </section>
              {
                form.campaign_type === "Own Spend Budget" &&
                <section className={styles.formContainer}>
                <label htmlFor="own_spend_budget">
                Own Spend Budget
                </label>

                <input
                  id="own_spend_budget"
                  name="own_spend_budget"
                  placeholder="Own Spend Budget"
                  // value={form.net_value}
                  // onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              }
              {
                form.campaign_type === "Brand Campaign Budget" && 
                <section className={styles.formContainer}>
                <label htmlFor="brand_campaign_budget">
                Brand Campaign Budget
                </label>

                <input
                  id="brand_campaign_budget"
                  name="brand_campaign_budget"
                  placeholder="Brand Campaign Budget"
                  // value={form.net_value}
                  // onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              }
              {
                form.campaign_type === "Product Campaign Budget" &&
                <section className={styles.formContainer}>
                <label htmlFor="product_campaign_budget">
                Product Campaign Budget
                </label>

                <input
                  id="product_campaign_budget"
                  name="product_campaign_budget"
                  placeholder="Product Campaign Budget"
                  // value={form.net_value}
                  // onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              }
              {
                form.campaign_type === "Bottomline Profit" &&
                <section className={styles.formContainer}>
                <label htmlFor="bottomline_profit">
                  Bottomline Profit
                </label>

                <input
                  id="bottomline_profit"
                  name="bottomline_profit"
                  placeholder="Bottomline Profit"
                  // onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              }
              <section className={styles.formContainer}>
                <label htmlFor="net_value">
                  net_value
                </label>

                <input
                  id="net_value"
                  name="net_value"
                  placeholder="net_value"
                  value={form.net_value}
                  onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              
              
              
            </div>
            <section className={styles.formContainerCheckBox}>
                <label htmlFor="confirmed">
                Has the contribution been confirmed yet?
                </label>

                <input
                  id="confirmed"
                  name="confirmed"
                  type="checkbox"
                  placeholder="confirmed"
                  value={form.confirmed}
                  checked={form.checked}
                  onChange={event => handleChangeCheckBox(form.id, event)}

                />
              </section>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default ContributionForm;