import axios from "services/axios";

// Accessible via
// const { transactions } = useAuth()

const Transactions = (user) => {
  return {
    async create(seconds, type = "PURCHASE", remarks = "", meta = {}) {
      const {
        data: { data },
      } = await axios.get("/transactions/currency");
      await axios.post("/transactions", {
        amount: seconds * data.secondWorth,
        appreciatedFor: data.secondWorth,
        type,
        remarks,
        meta,
        invalid: false,
      });
    },
    async createWithAmount(amount, type = "PURCHASE", remarks = "", meta = {}) {
      const {
        data: { data },
      } = await axios.get("/transactions/currency");
      await axios.post("/transactions", {
        amount,
        appreciatedFor: data.secondWorth,
        type,
        remarks,
        meta,
        invalid: false,
      });
    },
    async get() {
      const { data } = await axios.get("/transactions");
      return data.data;
    },
  };
};

export default Transactions;
