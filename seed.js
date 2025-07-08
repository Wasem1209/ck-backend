const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://torsimon17:asema@ruba.1f5wghx.mongodb.net/?retryWrites=true&w=majority&appName=Ruba&tls=true";

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const db = client.db("shipment_tracker");
    const collection = db.collection("shipments");

    const result = await collection.insertOne({
      tracking_id: "Y34XDHR",
      usps: "23409456724242342898",
      expected_arrival: "2025-07-05",
      progress: 2,
      shipper: {
        name: "Elite Bank",
        email: "elite@bank.com",
        address: "550 ST HOPE ST, LOS ANGELES, CA"
      },
      receiver: {
        name: "Sandra Tini",
        address: "Rua Leôncio Goncalves De Barros, Brazil"
      },
      description: [
        { no: 1, qty: 1, content: "Proof of Funds" },
        { no: 2, qty: 1, content: "Debit Mastercard (loaded)" }
      ],
      history: [
        { datetime: "2025-07-01", activity: "Processed", details: "Received at hub" },
        { datetime: "2025-07-02", activity: "Shipped", details: "Left warehouse" },
        { datetime: "2025-07-03", activity: "In Transit", details: "Lagos terminal" }
      ]
    });

    console.log("✅ Sample tracking inserted:", result.insertedId);
  } catch (error) {
    console.error("❌ Insert failed:", error);
  } finally {
    await client.close();
  }
}

run();