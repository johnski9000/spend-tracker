import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/SpendDetails.module.css";

function SpendFormElement({ post }) {
  const domainUrl = "budget-api.cloud.jdplc.com";
  const port = "443";
  const httpStatus = "https";
  const [reference, setReference] = useState();
  const [data, setData] = useState({});
  async function getReference() {
    try {
      const res = await axios.get(
        `${httpStatus}://${domainUrl}:${port}/api/reference-lists`
      );
      const data = res.data;
      setReference(data);
    } catch (err) {
      alert(
        `Unable to retrive data. API may need waking up, please contact Janusz Wozniak <Janusz.Wozniak@jdplc.com>: ${err}`
      );
      return err;
    }
  }
  useEffect(() => {
    getReference();
    setData(post);
  }, []);
  if (!reference) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrderHandler(data);
  };
  const placeOrderHandler = async (info) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/edit-post",
        {
          id: info.id,
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
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeInputNumber = (event) => {
    console.log(data)
    if (!isNaN(event.target.value)) {
      const { name, value } = event.target;
      setData((data) => ({ ...data, [name]: value }));
    }
  };
  const handleChangeInputText = (event) => {
    if (event.target.value.match(/^[a-zA-Z]*$/)) {
      const { name, value } = event.target;
      setData((data) => ({ ...data, [name]: value }));
    }
  };
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
      setData((data) => ({ ...data, [name]: value }));
  }
  function resetData () {
    setData(post);
  }
  return (
    <div>
      <div className={styles.button_container}>
        <button
        onClick={handleSubmit}
        >Save Changes</button>

        <button
        onClick={resetData}
        >Clear</button>
      </div>
      <div className={styles.mainFormContainer} key={data.id}>
        <section className={styles.formContainer}>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            label="year"
            variant="filled"
            value={data.year}
            onChange={(event) => handleChangeInputNumber(event)}
          />
        </section>

        <section className={styles.formContainer}>
          <label htmlFor="week">Week</label>

          <input
            id="week"
            name="week"
            placeholder="Week"
            value={data.week}
            variant="filled"
            onChange={(event) => handleChangeInputNumber(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="submittedBy">Spend Submitted By</label>

          <input
            id="submittedBy"
            name="submittedBy"
            placeholder="Submitted By"
            value={data.submittedBy}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="fascia">Fascia</label>
          <select
            id="fascia"
            name="fascia"
            value={data.fascia}
            required
            onChange={(event) => handleChangeInput(event)}
          >
            {reference ? (
              reference[5].reference_list.map(function (item, i) {
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
            value={data.brand}
            required
            onChange={(event) => handleChangeInput(event)}
          >
            {reference ? (
              reference[0].reference_list.map(function (item, i) {
                return <option key={i}>{item}</option>;
              })
            ) : (
              <div>Loading...</div>
            )}
          </select>
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="reference">Purchase Order No. / Reference No.</label>

          <input
            id="reference"
            name="reference"
            placeholder="Reference"
            value={data.reference}
            onChange={(event) => handleChangeInputNumber(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="department">Depatment</label>
          <select
            id="department"
            name="department"
            value={data.department}
            onChange={(event) => handleChangeInput(event)}
          >
            {reference ? (
              reference[4].reference_list.map(function (item, i) {
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
            value={data.submittedPurchaseBy}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="spendType">Spend Type</label>

          <input
            id="spendType"
            name="spendType"
            placeholder="Spend Type"
            value={data.spendType}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="spendDetail">Spend Detail</label>

          <input
            id="spendDetail"
            name="spendDetail"
            placeholder="Spend Detail"
            value={data.spendDetail}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="campaignType">Campaign Type</label>
          <select
            id="campaignType"
            name="campaignType"
            value={data.campaignType}
            onChange={(event) => handleChangeInput(event)}
            required
          >
            {reference ? (
              reference[1].reference_list.map(function (item, i) {
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
            value={data.netValue}
            onChange={(event) => handleChangeInputNumber(event)}
          />
        </section>
      </div>
    </div>
  );
}

export default SpendFormElement;
