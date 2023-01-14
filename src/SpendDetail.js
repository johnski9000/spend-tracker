import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./styles/SpendDetails.module.css";
import SpendFormElement from "./components/SpendFormElement.js"
import ContributionFormElement from "./components/ContributionFormElement.js"


function SpendDetail() {
  const [data, setData] = useState([]);
  const [contribution, setContribution] = useState()
  const [filter, setFilter] = useState("Spend")
  const [searchId, setSearchId] = useState('');
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
      getSpendForms();
      getContributionForms();
  }, []);

const handleChange = (event) => {
  setSearchId(event.target.value);
};


useEffect(() => {    
    async function fetchData () {
      if (searchId.length === 0 && filter === "Spend") {
        getSpendForms();
      } else if (searchId.length >= 1 && filter === "Spend") {
        const params = {
          reference_number: searchId
        };
        try {
          const res = await axios.get('http://localhost:4000/getAll', {
            params
          });
          const data = res.data
          setData(data);
          console.log(data)
        } catch (error) {
         alert(error) 
        }
      } 
      // else if (searchId.length === 0 && filter === "Contribution") {
      //   getContributionForms();

      // } else if (searchId.length >= 1 && filter === "Contribution") {
      //   const params = {
      //     _id: searchId.toString()
      //   };
      //   try {
      //     const res = await axios.get('http://localhost:4000/getAllContribution', {
      //       params
      //     });
      //     const data2 = res.data
      //     setContribution(data2);
      //     console.log(data2)
      //   } catch (error) {
      //    alert(error) 
      //   }
      // }
    }
    fetchData()
    
  
}, [searchId])



 
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
        <input type="text" className={styles.input} name="txt" onMouseOut={"this.value = ''; this.blur();"} value={searchId} onChange={handleChange} />
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
                      spend_submitted_by: post.spend_submitted_by,
                      fascia: post.fascia,
                      brand: post.brand,
                      reference_number: post.reference_number,
                      department: post.department,
                      submitted_purchase_by: post.submitted_purchase_by,
                      spend_type: post.spend_type,
                      spend_detail: post.spend_detail,
                      campaign_type: post.campaign_type,
                      net_value: post.net_value,
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
