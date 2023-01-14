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
          spend_submitted_by: info.spend_submitted_by,
          fascia: info.fascia,
          brand: info.brand,
          reference_number: info.reference_number,
          department: info.department,
          submitted_purchase_by: info.submitted_purchase_by,
          spend_type: info.spend_type,
          spend_detail: info.spend_detail,
          campaign_type: info.campaign_type,
          net_value: info.netValue,
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
          <label htmlFor="spend_submitted_by">Spend Submitted By</label>

          <input
            id="spend_submitted_by"
            name="spend_submitted_by"
            placeholder="Submitted By"
            value={data.spend_submitted_by}
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
          <label htmlFor="reference_number">Purchase Order No. / Reference No.</label>

          <input
            id="reference_number"
            name="reference_number"
            placeholder="Reference"
            value={data.reference_number}
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
          <label htmlFor="submitted_purchase_by">
            Purchase Order Submitted By
          </label>

          <input
            id="submitted_purchase_by"
            name="submitted_purchase_by"
            placeholder="Purchase Submitted By"
            value={data.submitted_purchase_by}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="spend_type">Spend Type</label>

          <input
            id="spend_type"
            name="spend_type"
            placeholder="Spend Type"
            value={data.spend_type}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="spend_detail">Spend Detail</label>

          <input
            id="spend_detail"
            name="spend_detail"
            placeholder="Spend Detail"
            value={data.spend_detail}
            onChange={(event) => handleChangeInputText(event)}
          />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="campaign_type">Campaign Type</label>
          <select
            id="campaign_type"
            name="campaign_type"
            value={data.campaign_type}
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
          <label htmlFor="net_value">Net Value</label>

          <input
            id="net_value"
            name="net_value"
            placeholder="x,xxx.xx"
            value={data.net_value}
            onChange={(event) => handleChangeInputNumber(event)}
          />
        </section>
      </div>
    </div>
  );
}

export default SpendFormElement;
