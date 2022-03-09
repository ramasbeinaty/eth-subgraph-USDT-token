// import the exchange entity and the transfer event
import {Exchange} from "../generated/schema";
import {Transfer} from "../generated/Transfer/USDT";

function handleTransfer(event: Transfer) : void {
    // load the event of type Transfer into entity type Exchange
    // if event doesn't exist, create new entity with event details
    let transfer = Exchange.load(event.transaction.hash.toHex());
    if(transfer === null){
        transfer = new Exchange(event.transaction.hash.toHex())
    }

    // set input to event params
    transfer.block = event.block.number;
    transfer.from = event.params.from.toHex();
    transfer.to = event.params.to.toHex();
    transfer.amount = event.params.value;

    // save inputs into db to be queried later
    transfer.save()
}