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
      const ref = res.data;
      setReference(ref);
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
        "http://localhost:4000/edit-contribution",
        {
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
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeInputNumber = (event) => {
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
  const handleChangeCheckBox = (id, event) => {

    setData({...data, confirmed: event.target.checked });
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
      <div>
      <div className={styles.mainFormContainer} key={data.id}>
              <section className={styles.formContainer}>
                <label htmlFor="spend_submitted_by">submittedBy</label>
                <input id="spend_submitted_by"           
                name="spend_submitted_by"
              label="spend_submitted_by"
              variant="filled"
              placeholder="spend_submitted_by"
              value={data.spend_submitted_by}
              onChange={event => handleChangeInputText(event)}
                  />
              </section>

              <section className={styles.formContainer}>
                <label htmlFor="fascia">fascia</label>

                <input
                  id="fascia"
                  name="fascia"
                  placeholder="fascia"
                  value={data.fascia}
                  variant="filled"
                  onChange={event => handleChangeInputText(event)}
                />
              </section>
              
              <section className={styles.formContainer}>
                <label htmlFor="brand">brand</label>
                <select
                  id="brand"
                  name="brand"
                  value={data.brand}
                  required
                  onChange={event => handleChangeInput(event)}

                >
                                    <option>brand</option>

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
                <label htmlFor="department">department</label>
                <select
                  id="department"
                  name="department"
                  value={data.department}
                  required
                  onChange={event => handleChangeInput(event)}
                >
                                    <option>department</option>

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
                <label htmlFor="spend_detail">
                spend_detail
                </label>

                <input
                  id="spend_detail"
                  name="spend_detail"
                  placeholder="spend_detail"
                  value={data.spend_detail}
                  onChange={event => handleChangeInputText(event)}
                />
              </section>
              <section className={styles.formContainer}>
                <label htmlFor="campaign_type">campaign_type</label>
                <select
                  id="campaign_type"
                  name="campaign_type"
                  value={data.campaign_type}
                  required
                  onChange={event => handleChangeInput(event)}
                >
                                    <option>campaign_type</option>

                 
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
                <label htmlFor="net_value">
                  net_value
                </label>

                <input
                  id="net_value"
                  name="net_value"
                  placeholder="net_value"
                  value={data.net_value}
                  onChange={event => handleChangeInputNumber(event)}

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
                  value={data.confirmed}
                  checked={data.confirmed}
                  onChange={event => handleChangeCheckBox(post.id, event)}

                />
              </section>
            </div>
    </div>
  );
}

export default SpendFormElement;
