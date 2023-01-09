import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../styles/SpendForm.module.css";

function SpendFormComponent() {
const domainUrl = "budget-api.cloud.jdplc.com";
  const port = "443";
  const httpStatus = "https";
  const [data, setData] = useState();

const {
    register,
    formState: { errors },
  } = useForm();

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
        <div >Loading...</div>
      </>
    );
  }
  return (
   <>
        {/* register your input into the hook by invoking the "register" function */}
        <div className={styles.mainFormContainer}>
        <section className={styles.formContainer}>
          <label htmlFor="year">Year</label>
          <input id="year" placeholder="Year"{...register("year")} />
        </section>

        {/* include validation with required or other standard HTML validation rules */}
        <section className={styles.formContainer}>
        <label htmlFor="week">Week</label>

        <input id="week" placeholder="Week" {...register("week", { required: true })} />
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="submittedBy">Spend Submitted By</label>

        <input id="submittedBy" placeholder="Submitted By" {...register("submittedBy", { required: true })} />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="fascia">Fascia</label>
        <select id="fascia" name="fascia" {...register("fascia", { required: true })}>
          
          {
            data ? data[5].reference_list.map(function(item, i){
              return <option key={i}>{item}</option>
            }) : <div>Loading...</div>
          }
        </select>
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="brand">Brand</label>
        <select id="brand" name="brand" {...register("brand", { required: true })}>
          
          {
            data ? data[0].reference_list.map(function(item, i){
              return <option key={i}>{item}</option>
            }) : <div>Loading...</div>
          }
        </select>
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="reference">Purchase Order No. / Reference No.</label>

        <input id="reference" placeholder="Reference" {...register("reference", { required: true })} />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="department">Depatment</label>
        <select id="department" name="department" {...register("department", { required: true })}>
          
          {
            data ? data[4].reference_list.map(function(item, i){
              return <option key={i}>{item}</option>
            }) : <div>Loading...</div>
          }
        </select>
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="submittedPurchaseBy">Purchase Order Submitted By</label>

        <input id="submittedPurchaseBy" placeholder="Purchase Submitted By" {...register("submittedPurchaseBy", { required: true })} />
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="spendType">Spend Type</label>
          
        <input id="spendType" placeholder="Spend Type" {...register("spendType", { required: true })} />
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="spendDetail">Spend Detail</label>
          
        <input id="spendDetail" placeholder="Spend Detail" {...register("spendDetail", { required: true })} />
        </section>
        <section className={styles.formContainer}>
          <label htmlFor="campaignType">Campaign Type</label>
        <select id="campaignType" name="campaignType" {...register("campaignType", { required: true })}>
          
          {
            data ? data[1].reference_list.map(function(item, i){
              return <option key={i}>{item}</option>
            }) : <div>Loading...</div>
          }
        </select>
        </section>
        <section className={styles.formContainer}>
        <label htmlFor="netValue">Net Value</label>
          
        <input id="netValue" placeholder="x,xxx.xx" {...register("netValue", { required: true })} />
        </section>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}

        </>
  );
}

export default SpendFormComponent;
