# SplitIt
React project that implements on ideas for receipt splitting using OCR, itemization, payment claims, no signin required!

## Key Features

* <b>OCR</b>
	* Upload images of the receipt.
 	* The site with then parse the receipt and add the items, prices, and quantities that it finds.
  	* This is all done behind the scenes using an OCR API.
* <b>Sharing</b>
	* When you create the SplitIt, each item has a unique ID that can be shared with friends.
 	* The friend can use that id and see the receipt and items once it is created.
 	* The friend does not need to sign-in to be able to do that.
* <b>Claiming</b>
	* Once a user has a code, they can claim any item on the receipt.
	* As you claim, prices get added below and show you the total price of all claimed items.
 	* You can then pay for the items and your friends can see everything you claimed and paid for.
* <b>Itemization</b>
	* Edit the items that were inputed through the OCR.
 	* Add other items that you want to charge for.
  	* Add quanitity and edit the list to what you want! 

## Video Example
[Video on Youtube](https://youtu.be/83tsnPJbnto)

## Screenshots

<div align="center">
	<img src="https://github.com/ollyplance/splitit/blob/master/images/OCR.png?raw=true" width="700"/>
	<img src="https://github.com/ollyplance/splitit/blob/master/images/ClaimWithName.png?raw=true" width="700"/>
	<img src="https://github.com/ollyplance/splitit/blob/master/images/FriendClaim.png?raw=true" width="700"/>
	<img src="https://github.com/ollyplance/splitit/blob/master/images/UniqueID.png?raw=true" width="700"/>
	<img src="https://github.com/ollyplance/splitit/blob/master/images/Claim.png?raw=true" width="700"/>
</div>

Created for 17356: Software Engineering for Startups
