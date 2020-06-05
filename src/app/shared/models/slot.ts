export class Slot {
    ID: number;
DealerID: number;
Date: string;
SlotTime: string;
SlotAvailable: number;

constructor(DealerID, date, SlotTime, SlotAvailable)
{
    
    this.DealerID = DealerID;
    this.Date = date;
    this.SlotTime = SlotTime;
    this.SlotAvailable = SlotAvailable;

}

}
