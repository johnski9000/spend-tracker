import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./styles/SpendForm.module.css";
import { v4 as uuidv4 } from 'uuid';

function SpendForm() {
  const domainUrl = "budget-api.cloud.jdplc.com";
  const port = "443";
  const httpStatus = "https";
  const [data, setData] = useState();
  const myRef = useRef(null);
  const [initialState, setInitialState] = useState([{
    formType: "Spend Form",
    id: uuidv4(),
    year: "",
    week: "",
    spend_submitted_by: "",
    fascia: "",
    brand: "",
    reference_number: "",
    department: "",
    submitted_purchase_by: "",
    spend_type: "",
    spend_detail: "",
    campaign_type: "",
    net_value: "",
  }])
  const [forms, setForms] = useState([
    {
      formType: "Spend Form",
      id: uuidv4(),
      year: "",
      week: "",
      spend_submitted_by: "",
      fascia: data ? data[5].reference_list[1] : "",
      brand: "",
      reference_number: "",
      department: "",
      submitted_purchase_by: "",
      spend_type: "",
      spend_detail: "",
      campaign_type: "",
      net_value: "",
    }
  ]);
  const addForms = () => {
    setForms([
      ...forms,
      {
        formType: "Spend Form",
        id: uuidv4(),
        year: "",
        week: "",
        spend_submitted_by: "",
        fascia: "",
        brand: "",
        reference_number: "",
        department: "",
        submitted_purchase_by: "",
        spend_type: "",
        spend_detail: "",
        campaign_type: "",
        net_value: "",
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
          const { data } = await axios.post("http://localhost:4000/spend-form", {
            id: info.id,
            formType: info.formType,
            year: info.year,
            week: info.week,
            spend_submitted_by: info.spend_submitted_by,
            fascia: info.fascia,
            brand: info.brand,
            reference_number: info.reference_number,
            department: info.department,
            submitted_purchase_by: info.submitted_purchase_by,
            spend_type: info.spend_type,
            spend_detail: info.spend_detail,
            campaign_type: info.campaign_type,
            net_value: info.net_value,
          });
          console.log(data);
        } catch (err) {
          alert(err.response.data.error);
          console.log(err)
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
          <h1>Spend form</h1>
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
            <div className={styles.mainFormContainer} key={form.id}>
              <section className={styles.formContainer}>
                <label htmlFor="year">Year</label>
                <input id="year"           
                name="year"
              label="year"
              variant="filled"
              placeholder="Year"
              value={form.year}
              onChange={event => handleChangeInput(form.id, event)}
                  />
              </section>

              <section className={styles.formContainer}>
                <label htmlFor="week">Week</label>

                <input
                  id="week"
                  name="week"
                  placeholder="Week"
                  value={form.week}
                  variant="filled"
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spend_submitted_by">Spend Submitted By</label>

                <input
                  id="spend_submitted_by"
                  name="spend_submitted_by"
                  placeholder="Spend Submitted By"
                  value={form.spend_submitted_by}
                  onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="fascia">Fascia</label>
                <select
                  id="fascia"
                  name="fascia"
                  value={form.fascia}
                  required
                  onChange={event => handleChangeInput(form.id, event)}

                >
                                  <option value="" disabled selected>Select Fascia</option> 

                  {data ? (
                    data[5].reference_list.map(function (item, i) {
                      return <option key={i}>{item}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </select>
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
                <label htmlFor="reference_number">
                  Purchase Order No. / Reference No.
                </label>

                <input
                  id="reference_number"
                  name="reference_number"
                  placeholder="reference_number"
                  value={form.reference_number}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="department">Depatment</label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={event => handleChangeInput(form.id, event)}

                >
                                    <option value="" disabled selected>Select Depatment</option>

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
                <label htmlFor="submitted_purchase_by">
                  Purchase Order Submitted By
                </label>

                <input
                  id="submitted_purchase_by"
                  name="submitted_purchase_by"
                  placeholder="Purchase Submitted By"
                  value={form.submitted_purchase_by}
                  onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spend_type">Spend Type</label>

                <input
                  id="spend_type"
                  name="spend_type"
                  placeholder="Spend Type"
                  value={form.spend_type}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spend_detail">Spend Detail</label>

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
                  required
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
                </select>
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="net_value">Net Value</label>

                <input
                  id="net_value"
                  name="net_value"
                  placeholder="x,xxx.xx"
                  value={form.net_value}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default SpendForm;
