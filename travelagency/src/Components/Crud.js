import React, { Component } from "react";
import "./table.css";

import dateFormat from "dateformat";

class Crud extends Component {
  state = {
    newlist: [],
    ticketDetail: [],
    airLine: "",
    contactNo: "",
    id: 0,
    travelDate: "",
    ticketNo: "",
    invoiceNo: "",
    passangerName: "",
    pnr: "",
    salePrice: 0,
    amountInCash: 0,
    amountInBank: 0,
    airPayAmount: 0,
    balance: 0,
    profit: 0,
    isEdit: false,
    agentReference: this.props.userName,

    errTravelDate:true,
    errTicketNo:true,
    errInvoiceNo: true,
    errPassangerName: true,
    errAirLine:true,
    errPnr: true,
    errSalePrice:true,
    errAirPayAmount:true,

    errTravelDateMsg:"*",
    errTicketNoMsg :"*",
    errInvoiceNoMsg:"*",
    errPassangerNameMsg:"*",
    errPnrMsg:"*",
    errAirLineMsg:"*",
    errSalePriceMsg:"Sale Price should be more then 0",
    errAirPayAmountMsg:"Air Pay should be more then 0",

  };


 
  HandlerFetchDataFromDB() {
    fetch("http://localhost:4000/GetAll")
      .then((response) => response.json())

      .then((data) => this.setState({ ticketDetail: data }));
  }
  componentDidMount() {
    this.HandlerFetchDataFromDB();
    // console.log(this.state.ticketDetail);
  }

  HandlerChange = (event) => {
    this.setState({
      [event.target.name]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };



  checkIsEmpty = (itemToCheckIsEmpty) =>{
    return (itemToCheckIsEmpty==="") ? false:true;

}

resetErrorState = _ =>{
  this.setState({
    errTravelDate:true,
    errTicketNo:true,
    errInvoiceNo: true,
    errPassangerName: true,
    errAirLine:true,
    errPnr: true,
    errSalePrice:true,
    errAirPayAmount:true,
  })
}
  handlerFromValidation = _ =>{
    this.resetErrorState();
   
    let {errTravelDate,errTicketNo,errPassangerName,errInvoiceNo,errAirPayAmount,errSalePrice,errPnr,errAirLine} = this.state;
    errTravelDate=this.checkIsEmpty(this.state.travelDate);
    errTicketNo=this.checkIsEmpty(this.state.ticketNo);
    errPassangerName=this.checkIsEmpty(this.state.passangerName);
    errInvoiceNo=this.checkIsEmpty(this.state.invoiceNo);
    errPnr=this.checkIsEmpty(this.state.pnr);
    errAirLine=this.checkIsEmpty(this.state.airLine);
    errAirPayAmount=(this.state.airPayAmount===0|| this.state.airPayAmount===isNaN)?false:true;
    errSalePrice=(this.state.salePrice===0||this.state.salePrice===isNaN)?false:true;
    this.setState({
      errTravelDate,errTicketNo,errPassangerName,errInvoiceNo,errAirPayAmount,errSalePrice,errPnr,errAirLine
    });
   
   
   return (errTravelDate && errTicketNo && errPassangerName && errInvoiceNo && errAirPayAmount && errSalePrice && errPnr && errAirLine) ? true :false;

  }
  HandlerAddRecord = (e) => {
    e.preventDefault();
    this.state.isEdit ? this.Update() : this.Add();
    
  };
  Update = () => {
   const isAllowedToUpdate= this.handlerFromValidation();
   
     if (isAllowedToUpdate){ 
  
    
    fetch(`http://localhost:4000/Update?travelDate=${this.state.travelDate}
         &ticketNo=${this.state.ticketNo}&invoiceNo=${this.state.invoiceNo}
         &passangerName=${this.state.passangerName}&pnr=${this.state.pnr}
         &airLine=${this.state.airLine}&contactNo=${this.state.contactNo}
         &airPayAmount=${this.state.airPayAmount}&salePrice=${this.state.salePrice}
         &amountInCash=${this.state.amountInCash}&amountInBank=${this.state.amountInBank}
         &dueAmount=${this.state.balance}&profit=${this.state.profit}
         &agentReference=${this.state.agentReference}&id=${this.state.id}
    `).then(alert("Record Has Been Updated!!"));

    this.setState({ isEdit: false });

    this.HandlerFetchDataFromDB();
    this.HandlerResetState();
    }
    else{alert('Please Enter Proper Data!!!');return}
    
  };

  Add = (_) => {
   
    const isAllowedToUpdate= this.handlerFromValidation();
    // alert(`value of isAllowedToupdate = ${isAllowedToUpdate}`);
     if (isAllowedToUpdate){ 
    fetch(`http://localhost:4000/Add?travelDate=${this.state.travelDate}
         &ticketNo=${this.state.ticketNo}&invoiceNo=${this.state.invoiceNo}
         &passangerName=${this.state.passangerName}&pnr=${this.state.pnr}
         &airLine=${this.state.airLine}&contactNo=${this.state.contactNo}
         &airPayAmount=${this.state.airPayAmount}&salePrice=${this.state.salePrice}
         &amountInCash=${this.state.amountInCash}&amountInBank=${this.state.amountInBank}
         &dueAmount=${this.state.balance}&profit=${this.state.profit}
         &agentReference=${this.state.agentReference}
    `)
    .then(alert("Record Has Been Inserted!!!"));
  
    this.HandlerResetState();
    this.HandlerFetchDataFromDB();
  
  }
   
    else{alert('Please Enter Proper Data!!!');return}
  };
  HandlerResetState() {
    this.setState({
      id: 0,
      travelDate: "",
      ticketNo: "",
      invoiceNo: "",
      passangerName: "",
      pnr: "",
      salePrice: 0,
      amountInCash: 0,
      amountInBank: 0,
      airPayAmount: 0,
      balance: 0,
      profit: 0,
      contactNo: "",
      airLine: "",
    });
  }
  GetBalance = (_) => {
    this.setState({
      balance:
        parseFloat(this.state.salePrice) -
        (parseFloat(this.state.amountInCash) +
          parseFloat(this.state.amountInBank)),
      profit:
        parseFloat(this.state.salePrice) - parseFloat(this.state.airPayAmount),
    });
    //
  };
  HandlerDeleteRecord = (id) => {
    fetch(`http://localhost:4000/Delete?id=${id}`).then(
      "Record has been deleted !!!"
    );
    this.HandlerFetchDataFromDB();
  };
  HandlerEditRecord = (t) => {
    this.setState({
      id: t.id,
      travelDate: dateFormat(t.travelDate, "yyyy-mm-dd"),
      ticketNo: t.ticketNo,
      invoiceNo: t.invoiceNo,
      passangerName: t.passangerName,
      pnr: t.pnr,
      salePrice: t.salePrice,
      amountInCash: t.amountInCash,
      amountInBank: t.amountInBank,
      airPayAmount: t.airPayAmount,
      balance: t.dueAmount,
      profit: t.profit,
      isEdit: true,
      contactNo: t.contactNo,
      airLine: t.airLine,
    });
  };

  HandlerGetDataEnteryForm = (_) => {
    const dataForm = (
      <table
        style={{ border: "1px solid black", width: "auto", marginLeft: "5%" }}
      >
        <tr>
          <td>
            <label>Travel Date:</label>
            <br />
            <input
              type="date"
              name="travelDate"
              value={this.state.travelDate}
              onChange={this.HandlerChange}
            />
            {(!this.state.errTravelDate)?<span style={{color:"red"}}>{this.state.errTravelDateMsg}</span>:null}
          </td>

          <td>
            <label>Ticket No:</label>
            <br />
            <input
              type="text"
              name="ticketNo"
              value={this.state.ticketNo}
              placeholder="Ticket No"
              onChange={this.HandlerChange}
            />
           
            
             {(!this.state.errTicketNo)?<span style={{color:"red"}}>{this.state.errTicketNoMsg}</span>:null}
          </td>
          <td>
            <label>Invoice No:</label>
            <br />
            <input
              type="text"
              name="invoiceNo"
              value={this.state.invoiceNo}
              placeholder="Invoice No"
              onChange={this.HandlerChange}
            />
             {(!this.state.errInvoiceNo)?<span style={{color:"red"}}>{this.state.errInvoiceNoMsg}</span>:null}
          </td>
        </tr>
        <tr>
          <td>
            <label>Passanger Name:</label>
            <br />
            <input
              type="text"
              name="passangerName"
              value={this.state.passangerName}
              placeholder="Passanger Name"
              onChange={this.HandlerChange}
            />
             {(!this.state.errPassangerName)?<span style={{color:"red"}}>{this.state.errPassangerNameMsg}</span>:null}
          </td>

          <td>
            <label>PNR:</label>
            <br />
            <input
              type="text"
              name="pnr"
              value={this.state.pnr}
              placeholder="PNR"
              onChange={this.HandlerChange}
            />
             {(!this.state.errPnr)?<span style={{color:"red"}}>{this.state.errTicketNoMsg}</span>:null}
          </td>
          <td>
            <label>Air Line:</label>
            <br />
            <input
              type="text"
              name="airLine"
              value={this.state.airLine}
              placeholder="Air Line"
              onChange={this.HandlerChange}
            />
            {(!this.state.errAirLine)?<span style={{color:"red"}}>{this.state.errAirLineMsg}</span>:null}
          
          </td>
        </tr>
        <tr>
          <td>
            <label>Contact No:</label>
            <br />
            <input
              type="text"
              name="contactNo"
              value={this.state.contactNo}
              placeholder="Contact No"
              onChange={this.HandlerChange}
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td>
            <label>Air Pay:</label>
            <br />
            <input
              // style={{ width: "50px" }}
              type="number"
              name="airPayAmount"
              value={this.state.airPayAmount}
              onChange={this.HandlerChange}
            />
            <br/>
            {(!this.state.errAirPayAmount)?<span style={{color:"red"}}>{this.state.errAirPayAmountMsg}</span>:null}
          </td>
          <td>
            <label>Price:</label>
            <br />
            <input
              // style={{ width: "50px" }}
              type="number"
              name="salePrice"
              value={this.state.salePrice}
              onChange={this.HandlerChange}
            /><br/>
            {(!this.state.errSalePrice)?<span style={{color:"red"}}>{this.state.errSalePriceMsg}</span>:null}
          </td>

          <td>
            <label>Cash:</label>
            <br />
            <input
              // style={{ width: "50px" }}
              name="amountInCash"
              value={this.state.amountInCash}
              type="number"
              onChange={this.HandlerChange}
              onBlur={this.GetBalance}
            />
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr>
          <td>
            <label>Bank:</label>
            <br />
            <input
              style={{ width: "70px" }}
              name="amountInBank"
              value={this.state.amountInBank}
              type="number"
              onChange={this.HandlerChange}
              onBlur={this.GetBalance}
            />
          </td>
          <td></td>
          <td>
            <label>Balnce Payment: </label>
            <br />
            <span style={{ background: "red", width: "50px" }}>
              {this.state.balance}
            </span>
          </td>
          <td>
            <label>Profit:</label>
            <br />
            <span style={{ background: "Green" }}>{this.state.profit}</span>
          </td>
        </tr>

        <tr>
          <td>
            <td>
              <button onClick={this.HandlerAddRecord}>
                {this.state.isEdit ? "Update" : "Add"}
              </button>
            
            </td>
          </td>
        </tr>
      </table>
    );
    return dataForm;
  };

  HandlerGetListOfRecords = (_) => {
    const listForm = (
      <div>
        <h1>List Of Tickets:</h1> <hr />
        <table className="myTable table-striped">
          <thead>
            <th>Name</th>
            <th>Ticket No</th>
            <th>PNR</th>
            <th>Traveling Date</th>
            <th>Air Pay</th>
            <th>Sale Price</th>
            <th>Due Amount</th>
            <th>Profit</th>
            <th>Action</th>
          </thead>

          {this.state.ticketDetail.map((t) => (
            <tr key={t.id} className="myTable table-striped">
              <td>{t.passangerName}</td>
              <td>{t.ticketNo}</td>
              <td>{t.pnr}</td>
              <td>{new Date(t.travelDate).toLocaleDateString()}</td>
              <td>{t.airPayAmount}</td>
              <td>{t.salePrice}</td>
              <td>{t.dueAmount}</td>
              <td>{t.profit}</td>
              <td>
                <button onClick={() => this.HandlerEditRecord(t)}>Edit</button>
              </td>
              <td>
                <button onClick={() => this.HandlerDeleteRecord(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <button onClick={() => console.log(this.state.newlist)}>
          Click Me
        </button>
      </div>
    );
    return listForm;
  };
  render() {
    return (
      <div>
        {this.HandlerGetDataEnteryForm()}
        {this.HandlerGetListOfRecords()}
      </div>
    );
  }
}

export default Crud;
