const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51LuCt6KMMJ59eTi41jkHUTYoNHb6Ijhp1b5iygt1FNm7oLnTLET3MUywrVnVJ3blYY2eeBmfaaVZAe00JTyDHfEr00bJZ8mkeY"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/api/test", (req, res) => {
  res.send("testing");
});

app.post("/api/checkout", async (req, res, next) => {
  const body = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: "ngn",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    // res.send(body.amount);
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server running");
});
