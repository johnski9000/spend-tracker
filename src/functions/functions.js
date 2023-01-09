import axios from 'axios'

// set these to localhost etc. for dev
const domainUrl = 'budget-api.cloud.jdplc.com';
const port = '443';
const httpStatus = 'https';

const url = `${httpStatus}://${domainUrl}:${port}/api/spends/`


class SpendService {
// Get all reference_lists
  static async getReference() {
    try {
      const res = await axios.get(`${httpStatus}://${domainUrl}:${port}/api/reference-lists`)
      const data = res.data
      return data
    } catch (err) {
      alert(`Unable to retrive data. API may need waking up, please contact Jamie Wong <Jamie.Wong@jdplc.com>: ${err}`);
      return err
    }
  }

  // Get all Spend
  static async getSpend() {
    try {
      const res = await axios.get(url)
      const data = res.data
      return data
    } catch (err) {
      alert(`Unable to retrive data. API may need waking up, please contact Jamie Wong <Jamie.Wong@jdplc.com>: ${err}`);
      return err
    }
  }
  // Create Spend
  static insertSpend(data) {
    return axios
      .post(url, { ...data })
      .then((response) => {
        if (response.status === 200) {
          // window.location.reload()
          alert('Successfully posted entry.');
        }
      })
      .catch((error) => {
        // console.log('Insert Spend error', error)
        alert(`Unable to post, API may need waking up, please contact Jamie Wong <Jamie.Wong@jdplc.com>: ${error}`);
      })
  }
  static editSpend(data, id) {
    return axios
      .put(`${httpStatus}://${domainUrl}:${port}/api/spends/${id}`, { ...data })
      .then((response) => {
        if (response.status === 200) {
           alert('Successfully edited entry.');
          // window.location.reload()
        }
      })
      .catch((error) => {
        alert(`Unable to post, API may need waking up, please contact Jamie Wong <Jamie.Wong@jdplc.com>: ${error}`);
      })
  }
  // static async deleteSpend(id) {
  //   if (confirm('Do you really want to delete?')) {
  //     await axios
  //       .delete(`${httpStatus}://${domainUrl}:${port}/api/spends/${id}`)
  //       // eslint-disable-next-line
  //       .then((response) => {
  //         console.log(`Deleted ${id}`)
  //       })
  //   }
  // }
}

export default SpendService
