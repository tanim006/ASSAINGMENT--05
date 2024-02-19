// Common Functions Starts Here
function elementById(elementId){
    const element = document.getElementById(elementId);
    return element;
}
function elementsByClassName(className){
    const elements = document.getElementsByClassName(className);
    return elements;
}
function elementByQuerySelector(element){
    const theElement = document.querySelector(element);
    return theElement;
}
function textToInteger(element){
    return parseInt(element.innerText)
}
function getInnerText(element){
    const innerTextOfAnElement = element.innerText;
    return innerTextOfAnElement;
}
function setInnerText(element, value){
    element.innerText = value;
}
function remainingSeat(theTotalSeat, totalSelectedSeat){
    return theTotalSeat - totalSelectedSeat;
}
function createAnHtmlElement(element){
    return document.createElement(element);
}
function appendContent(place, item){
    return place.appendChild(item);
}
function validatePassengerNumber(inputFieldValue) {
    if (!regex.test(inputFieldValue)) {
        addClass(passengerNumberElement, 'border-red-600');
        return false;
    } else {
        removeClass(passengerNumberElement, 'border-red-600');
        return true;
    }
}
function enableNextButton() {
    if (validatePassengerNumber(passengerNumber) && (selectedSeat > 0)) {
        nextButtonElement.removeAttribute('disabled');
        removeClass(nextButtonElement, 'cursor-not-allowed');
        removeClass(nextButtonElement, 'opacity-50');
        errorMessage.innerText = '';
    } else {
        nextButtonElement.setAttribute('disabled', true);
        addClass(nextButtonElement, 'cursor-not-allowed');
        addClass(nextButtonElement, 'opacity-50');
        addClass(errorMessage, 'mt-1');
        errorMessage.innerText = 'Please Select At least One Seat And Provide A Correct Phone Number';
    }
}
function enableApplyButton() {
    if (selectedSeat === 4) {
        applyButton.removeAttribute('disabled');
        removeClass(applyButton, 'cursor-not-allowed');
        removeClass(applyButton, 'opacity-50');
    } else {
        applyButton.setAttribute('disabled', true);
        addClass(applyButton, 'cursor-not-allowed');
        addClass(applyButton, 'opacity-50');
    }
}
function addClass(element, nameOfTheClass){
    element.classList.add(nameOfTheClass);
}
function removeClass(element, nameOfTheClass){
    element.classList.remove(nameOfTheClass);
}
// Common Functions Ends Here

// Variables Starts Here 
const totalSeatElement = elementById('totalSeat');
const totalSeat = textToInteger(totalSeatElement);
const perSeatPriceElement = elementById('perSeatPrice');
const perSeatPrice = textToInteger(perSeatPriceElement);
const selectedSeatElement = elementById('selectedSeat');
let   selectedSeat = textToInteger(selectedSeatElement);
const totalPriceElement = elementById('totalPrice');
let   totalPrice = textToInteger(totalPriceElement);
const grandTotalElement = elementById('grandTotal');
const grandTotal = textToInteger(grandTotalElement);
const seatNumbers = elementsByClassName('seat-number');
const seatInfoContainer = elementById('seatInfoContainer');
const regex = /^01[3-9]\d{8}$/;
const passengerNumberElement = elementById('passengerNumber');
let passengerNumber = '';
passengerNumberElement.addEventListener('keyup', function (event) {
    passengerNumber = event.target.value;
    enableNextButton();
});
const nextButtonElement = elementById('nextButton');
const headerElement = elementByQuerySelector('header');
const mainElement = elementByQuerySelector('main');
const footerElement = elementByQuerySelector('footer');
const afterPurchase = elementByQuerySelector('.after-purchase');
const continueButton = elementById('continueButton');
const applyButton = elementById('applyButton');
const newCouponCode = getInnerText(elementById('newCoupon'));
const coupleCouponCode = getInnerText(elementById('coupleCoupon'));
const applyCouponArea = elementById('applyCouponArea');
const couponInputElement = elementById('couponInput');
const discountInfo = elementById('discountInfo');
const passengerName = elementById('passengerName'); 
const passengerEmail = elementById('passengerEmail');
const errorMessage = elementById('errorMessage');
// Variables Ends Here 

// Seat Number Iteration Starts Here 
let selectedSeatCount = 0;
for(const seatNumber of seatNumbers){
    seatNumber.addEventListener('click', function(event){
        if (selectedSeatCount < 4) {
            event.target.classList.add('bg-green-color', 'text-white');
            selectedSeat+=1;
            selectedSeatCount+=1;
            setInnerText(selectedSeatElement, selectedSeat);
            setInnerText(totalSeatElement, remainingSeat(totalSeat, selectedSeat));
            const div = createAnHtmlElement('div');
            div.innerHTML = `
                <div class="grid grid-cols-3 gap-2 xl:gap-32 mt-4 justify-items-center xl:justify-items-start">
                    <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                        ${event.target.innerText}
                    </h5>
                    <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                        Economoy
                    </h5>
                    <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                        ${perSeatPrice}
                    </h5>
                </div>
            `;
            appendContent(seatInfoContainer, div);
            totalPrice+=perSeatPrice;
            setInnerText(totalPriceElement, totalPrice);
            setInnerText(grandTotalElement, totalPrice);
            event.target.setAttribute('disabled', true);
            enableNextButton();
            enableApplyButton();
        } else {
            alert('You Can Select A Maximum Of 4 Seat.');
        }
    });
}
// Seat Number Iteration Ends Here 

// After Next Button Clicking Functionality Starts Here
nextButtonElement.addEventListener('click', function(){
    addClass(headerElement, 'hidden');
    addClass(mainElement, 'hidden');
    addClass(footerElement, 'hidden');
    removeClass(afterPurchase, 'hidden');
    passengerNumberElement.value = '';
    discountInfo.innerHTML = '';
    removeClass(applyCouponArea, 'hidden');
    passengerName.value = '';
    passengerEmail.value = '';
})
// After Next Button Clicking Functionality Ends Here

// After Continue Button Clicking Functionality Starts Here
continueButton.addEventListener('click', function(){
    removeClass(headerElement, 'hidden');
    removeClass(mainElement, 'hidden');
    removeClass(footerElement, 'hidden');
    addClass(afterPurchase, 'hidden');
    selectedSeat = 0;
    selectedSeatCount = 0;
    setInnerText(selectedSeatElement, selectedSeat);
    setInnerText(totalSeatElement, totalSeat);
    totalPrice = 0;
    setInnerText(totalPriceElement, totalPrice);
    setInnerText(grandTotalElement, totalPrice);
    seatInfoContainer.innerHTML = '';
    passengerNumber = '';
    enableNextButton();
    enableApplyButton();
    removeClass(passengerNumberElement, 'border-red-600');
    errorMessage.innerText = '';
    for(const seatNumber of seatNumbers){
        seatNumber.classList.remove('bg-green-color', 'text-white');
        seatNumber.removeAttribute('disabled');
    }
})

applyButton.addEventListener('click', function(){
    if(couponInputElement.value === newCouponCode){
        const discountPrice = (totalPrice * 0.15);
        const div = createAnHtmlElement('div');
        div.innerHTML = `
            <div class="my-4 py-4 border-y border-dashed border-dark-color-[.2] flex justify-between">
                <h5 class="inter-font font-medium text-dark-color">
                    Discounted Price
                </h5>
                <h5 class="inter-font font-medium text-dark-color">
                    BDT ${parseInt(discountPrice)}
                </h5>
            </div>
        `;
        discountInfo.append(div);
        totalPrice -= discountPrice;
        setInnerText(grandTotalElement, totalPrice);
        couponInputElement.value = '';
        addClass(applyCouponArea, 'hidden');
    }else if(couponInputElement.value === coupleCouponCode){
        const discountPrice = (totalPrice * 0.20);
        const div = createAnHtmlElement('div');
        div.innerHTML = `
            <div class="my-4 py-4 border-y border-dashed border-dark-color-[.2] flex justify-between">
                <h5 class="inter-font font-medium text-dark-color">
                    Discounted Price
                </h5>
                <h5 class="inter-font font-medium text-dark-color">
                    BDT ${parseInt(discountPrice)}
                </h5>
            </div>
        `;
        discountInfo.append(div);
        totalPrice -= discountPrice;
        setInnerText(grandTotalElement, totalPrice);
        couponInputElement.value = '';
        addClass(applyCouponArea, 'hidden');
    }else{
        couponInputElement.value = '';
        alert('Invalid coupon code.');
    }
});
// After Apply Button Clicking Functionality Ends Here