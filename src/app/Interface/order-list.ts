import { Interface } from "readline";

export interface OrderList {
    OrderNo: number | null;
    FirstName: string | null;
    AddressLine1: string | null;
    DispatchBy: string | null;
    RiderFirstName: string | null;
    RemainingMinuts: number | null;
    StatusId: number | null;
    BookedTime: string | null;
    ContactNumber: string | null;
    StartTimeString: string | null;
    EndTimeToString: string | null;

    //report Properties


}

export interface Accounts {
    RiderFirstName: string | null;// Rider Name
    BranchName: string |null; // Branch Name
    DeliveryOrderID: String | null; 
    Amount: number | null;
}

export interface RiderSetting {
    FirstName: string | null;
    MiddleName: string | null;
    LastName: string | null;
    CellNumber: string | null;
    BranchName: string | null;
    Status: number | null;
    // FirstName: string | null;
    RiderStatus: number | null;
}

export interface Reportlist
{
    // Resturance Performance Report

    BranchNam: string | null;
    Title: string | null;
    TotalOrders: string | null;
    TotalCanceled: string | null;
    TotalDelivered: string | null;
    TotalAmount: string | null;
    RevenueLost: string | null;
    AvgCheckAmount: string | null;
    SingleDispatch: string | null;
    DoubleDispatch: string | null;
    ThreeDispatchPlus: string | null;
    AvgDriveTime: string | null;
    AvgSosTime: string | null;
    DeliveredUnder30: string | null;
    DeliveredUnder20: string | null;
    ManualDispatchCount: string | null;
    Rating: number | null;
    RiderName: string | null;
    BranchTitle: string | null;
    DeliveredOrders: number | null;
    DeliveredOrdersRevenue: number | null;
    CancelOrders: number | null;
    CancelOrdersRevenue: number | null;
    InStoreTime: number | null;
    TotalDriveTime: number | null;
    AvgDeliveryTime: number | null;
    SOS20Mins: number | null;
    SOS30Mins: number | null;

   OrderNo : string | null;
   CustomerName : string | null;
   CustomerAddress : string | null;
   CustomerPhoneNumber : string | null;
   ReceiveTime : string | null;
   DispatchDateTime : string | null;
   DeliveryDateTime : string | null;
   Latitude : string | null;
   Longitude : string | null;
   Distance : string | null;
   CLatitude : string | null;
   CLongitude : string | null;
   Distance2 : string | null;

// //    Title: string | null;
// //    OrderNo: string | null;
// //    Latitude: string | null;
// //    Longitude: string | null;
// //    RiderName: string | null;
// // //    CustomerName: string | null;
// //    CustomerAddress: string | null;
//    CustomerPhone: string | null;
// //    CLongitude: string | null;
// //    Distance: string | null;
// //    Distance2: string | null;
//    ReceivedByDateTime: string | null;
//    DispatchedDateTime: string | null;
//    FinalStatusDateTIme: string | null;
//    ReachedDateTime: string | null;
//    Amount: string | null;
// //    IST: string | null;
//    DriveTime: string | null;
// //    Rating: string | null;
//    RatingComment: string | null;
//    DisptachStatus: string | null;
//    OrderStatus: string | null;
//    BookedDateTime: string | null;

}

export interface OrderDetail
{
      DeliveryOrderID : number | null;
      OrderNo : number
      CustomerId : number
      Amount : number
      FirstName : string;
      LastName : string;
      AddressLine1 : string;
      AddressLine2 : string;
      BranchRiderId : number
      RiderFirstName : string;
      RiderLastName : string;
      OrderStatus : string;
      Title : string;
      Latitude : string;
      Longitude : string;
      StatusId : number
      BookedTime : Date;
      Payment : string;

      RejectionComment : string;
      RejectionAmount : number;
      EstimatedTime : number;
      ExptectedDeliveryTime : Date;
      BranchName : string;
      BranchCity : string;
      ContactNumber : string;

      UserName : string;

    // public List<OrderLogModel> OrderLog { get; set; }
    // public List<AutoAssignModel> AutoAssigLog { get; set; }
    // public List<OrderItems> ItemsList { get; set; }
    // public List<BranchRiderModel> AvailabeRiders { get; set; }

     RemainingMinuts : number
     OrderThrough : string;
     CustomerLat : string;
     CustomerLon : string;
     DispatchBy : string;
}

export interface Ratinglist
{
    RiderName: string | null;
    NoOfOrders: string | null;
    RiderId: string | null;
    Rating: string | null;
    OrdersLess20: string | null;
    BranchTitle:string | null;
    ProfileImage:string | null;

}