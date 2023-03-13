# Ostplace
### Ostplace is an angular at frontend and django backend project, created for people who cant create music, but need OSTS for their projects. 
Run `npm i` to recover node_modules then run `ng serve` for a dev server, at the end navigate to `http://localhost:4200/` in your browser.

# PROJECT OVERVIEW FROM CREATOR:
Firstly User will see unlogged page, where he can click on image and listen to exemplary 3 OSTS or navigate to login component.
<img src='www/unlogged.png' alt='unloggedSitePNG'/>

### At login component user can log into, if he got active account.
<img src='www/login.png' alt='unloggedSitePNG'/>

### If not, he can create new account with email confirmation.
<img src='www/register.png' alt='unloggedSitePNG'/>
<img src='www/confirmEmailDetails.png' alt='confirmEmailDetails'/>
<img src='www/confirmEmailPNG.png' alt='confirmEmailPNG'/>

### After that user can login correctly into site for logged users.
<img src='www/loggedHomePage.png' alt='loggedHomePage'/>

## User can sort by search Tab and by simple click on tag in OST.
#SearchTAB
<img src='www/mainPageSearch.png' alt='loggedHomePage'/>

## Both versions of search result can be sorted
<img src='www/loggedSearchResultSortBy.png' alt='loggedSearchResultSortBy'/>

#Tag click
<img src='www/loggedPageSearchTag.png' alt='loggedHomePage'/>

### On OST place user can add his song for real money.
<img src='www/AddOst.png' alt='AddOst'/>

### Modify his added content in MyOsts component
<img src='www/My Osts.png' alt='My Osts'/>

### Change his user account.
<img src='www/settings.png' alt='settings'/>

### And ofcourse buy OSTS. On example image below user "wilkixx123" has been added a song, so "testUser202" might be able to buy it by clicking "check OST" and "add to basket" button.
<img src='www/AddItemToBasket.png' alt='checkOSTnewUser'/>

### in basket user will see added items that he is going to buy or remove from basket.
<img src='www/basket.png' alt='ItemBasket'/>

### If user decide to buy items from basket he will be moved to payment gateway where he can insert credit card informations. To show how it works firstly i'm going to log into "stripe" from CMD to get access.
<img src='www/stripeAccessGranted.png' alt='stripeAccessGranted'/>

### Now i can listen to stripe payment
<img src='www/stripe listen.png' alt='stripeListen'/>

### when user will provide credit card details where he got enough balance, he will got basket removed and bought items will be added into his account. Meanwhile person who sold it will get money minus my and stripe percents.

### card details insert.
<img src='www/stripeBuy.png' alt='stripeBuy'/>

### payment status
user
<img src='www/completeBuy.png' alt='completeBuy'/>

stripe
<img src='www/stripeCLISuccess.png' alt='stripeCLISuccess'/>

### After payment basket
customer basket
<img src='www/bought and got.png' alt='bought and got'/>

seller basket
<img src='www/SOLDandGOTNOT.png' alt='SOLDandGOTNOT'/>

## stripe customer balance after he sold item
<img src='www/stripeAccountMoney.png' alt='stripeAccountMoney'/>

# And thats how it works at the moment.
