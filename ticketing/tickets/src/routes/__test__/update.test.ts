import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
it("returns 404 if the privided id does not exist ", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "adsasdads",
      price: 20,
    })
    .expect(404);
});
it("returns 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "adsasdads",
      price: 20,
    })
    .expect(401);
});
it("returns 401 if the user does not own ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "adsasdads",
      price: 20,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asas",
      price: 1000,
    })
    .expect(401);
});
it("returns 400 if  the user provides invalid title or price", async () => {});
it("updates the ticket provided valid inputs", async () => {});
