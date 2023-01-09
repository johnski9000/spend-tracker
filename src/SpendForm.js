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
    id: uuidv4(),
    year: "",
    week: "",
    submittedBy: "",
    fascia: "",
    brand: "",
    reference: "",
    department: "",
    submittedPurchaseBy: "",
    spendType: "",
    spendDetail: "",
    campaignType: "",
    netValue: "",
  }])
  const [forms, setForms] = useState([
    {
      formType: "Spend Form",
      id: uuidv4(),
      year: "",
      week: "",
      submittedBy: "",
      fascia: data ? data[5].reference_list[1] : "",
      brand: "",
      reference: "",
      department: "",
      submittedPurchaseBy: "",
      spendType: "",
      spendDetail: "",
      campaignType: "",
      netValue: "",
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
        submittedBy: "",
        fascia: "",
        brand: "",
        reference: "",
        department: "",
        submittedPurchaseBy: "",
        spendType: "",
        spendDetail: "",
        campaignType: "",
        netValue: "",
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
            submittedBy: info.submittedBy,
            fascia: info.fascia,
            brand: info.brand,
            reference: info.reference,
            department: info.department,
            submittedPurchaseBy: info.submittedPurchaseBy,
            spendType: info.spendType,
            spendDetail: info.spendDetail,
            campaignType: info.campaignType,
            netValue: info.netValue,
          });
          console.log(data);
        } catch (err) {
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
                <label htmlFor="submittedBy">Spend Submitted By</label>

                <input
                  id="submittedBy"
                  name="submittedBy"
                  placeholder="Submitted By"
                  value={form.submittedBy}
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
                                    <option>Fascia</option>

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
                                    <option>Brand</option>

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
                <label htmlFor="reference">
                  Purchase Order No. / Reference No.
                </label>

                <input
                  id="reference"
                  name="reference"
                  placeholder="Reference"
                  value={form.reference}
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
                                    <option>Depatment</option>

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
                <label htmlFor="submittedPurchaseBy">
                  Purchase Order Submitted By
                </label>

                <input
                  id="submittedPurchaseBy"
                  name="submittedPurchaseBy"
                  placeholder="Purchase Submitted By"
                  value={form.submittedPurchaseBy}
                  onChange={event => handleChangeInput(form.id, event)}

                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spendType">Spend Type</label>

                <input
                  id="spendType"
                  name="spendType"
                  placeholder="Spend Type"
                  value={form.spendType}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="spendDetail">Spend Detail</label>

                <input
                  id="spendDetail"
                  name="spendDetail"
                  placeholder="Spend Detail"
                  value={form.spendDetail}
                  onChange={event => handleChangeInput(form.id, event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="campaignType">Campaign Type</label>
                <select
                  id="campaignType"
                  name="campaignType"
                  value={form.campaignType}
                  required
                  onChange={event => handleChangeInput(form.id, event)}
                >
                  <option>Campaign Type</option>
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
                <label htmlFor="netValue">Net Value</label>

                <input
                  id="netValue"
                  name="netValue"
                  placeholder="x,xxx.xx"
                  value={form.netValue}
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
