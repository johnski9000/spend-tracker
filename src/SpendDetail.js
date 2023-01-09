import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./styles/SpendDetails.module.css";
import SpendFormElement from "./components/SpendFormElement.js"
import ContributionFormElement from "./components/ContributionFormElement.js"


function SpendDetail() {
  const [data, setData] = useState();
  const [contribution, setContribution] = useState()
  const [filter, setFilter] = useState("Spend")
  const [searchId, setSearchId] = useState('');
  // const [reference, setReference] = useState();
  const handleChange = (event) => {
    setSearchId(event.target.value);
    console.log(searchId)
  };
  async function getSpendForms() {
    try {
      const res = await axios.get("http://localhost:4000/");
      const data = res.data;
      setData(data);
    } catch (err) {
      alert(
        `Unable to retrive data. API may need waking up, please contact Janusz Wozniak <Janusz.Wozniak@jdplc.com>: ${err}`
      );
      return err;
    }
  }
  async function getContributionForms() {
    try {
      const res = await axios.get("http://localhost:4000/contribution");
      const cont = res.data;
      setContribution(cont);
    } catch (err) {
      alert(
        `Unable to retrive data. API may need waking up, please contact Janusz Wozniak <Janusz.Wozniak@jdplc.com>: ${err}`
      );
      return err;
    }
  }
  
  useEffect(() => {
    if (filter === "Spend") {
      getSpendForms();
    } else if (filter === "Contribution") {
      getContributionForms();

    }
  }, [filter]);

 
  

  if (!data) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  if (!contribution) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  
  return (
    <div>
      <div className={styles.filterContainer}>
      <div className={styles.box_search}>
      <form name="search">
        <input type="text" className={styles.input} name="txt" onmouseout="this.value = ''; this.blur();" value={searchId} onChange={handleChange} />
        <i ></i>
    </form>
      </div>
        <div className={styles.filter}>
          <div onClick={() => setFilter("Spend")} className={filter === "Spend" ? styles.filter_spend_active : styles.filter_spend}>Spend</div>
          <div onClick={() => setFilter("Contribution")} className={filter === "Contribution" ? styles.filter_contribution_active : styles.filter_contribution}>Contribution</div>
        </div>
      </div>
      
      {
        filter === "Spend" ? data.map((post) => (
          <div className={styles.box}>
            <div className={styles.main_title}>
              <h1>{post.formType}</h1>
              <div className={styles.fancy_line}></div>
            </div>
            {
              post.formType === "Spend Form" && <SpendFormElement 
              post={{
                id: post._id,
                      year: post.year,
                      week: post.week,
                      submittedBy: post.submittedBy,
                      fascia: post.fascia,
                      brand: post.brand,
                      reference: post.reference,
                      department: post.department,
                      submittedPurchaseBy: post.submittedPurchaseBy,
                      spendType: post.spendType,
                      spendDetail: post.spendDetail,
                      campaignType: post.campaignType,
                      netValue: post.netValue,
              }}
              />
            }
          </div>))
          :
          contribution.map((post) => (
            <div className={styles.box}>
              <div className={styles.main_title}>
                <h1>{post.formType}</h1>
              <div className={styles.fancy_line}></div>
            </div>
            {
             post.formType === "Contribution Form" && <ContributionFormElement
             post={{
              
              id: post._id,
              brand: post.brand,
                    campaign_type: post.campaign_type,
                    confirmed: post.confirmed,
                    department: post.department,
                    fascia: post.fascia,
                    net_value: post.net_value,
                    spend_detail: post.spend_detail,
                    submittedPurchaseBy: post.submittedPurchaseBy,
                    spend_submitted_by: post.spend_submitted_by
    
            }}
             />
            }
            </div>
          ))
      }
    </div>
  );
    
}

export default SpendDetail;
