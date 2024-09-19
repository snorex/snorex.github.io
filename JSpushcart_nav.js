JLpushchart_nav = function () {

    /* numeric values for each poker positon; an addition of two positions will give an unique value for selecting combos and displaying the correct charts*/
    const LJ = 4;
    const HJ = 8;
    const CO = 16;
    const BTN = 32;
    const SB = 64;
    const BB = 128;

    const MY_CLICKED = 1;
    const THEIR_CLICKED = 2;

    let my_button_clicked = function() {
        
        console.log("Me current:" + JSON.stringify(navStates.my_pos));
        console.log("They current: " + JSON.stringify(navStates.their_pos));

        let tmp1BTN;
        let tmp2BTN;
        let clickedId = this.getAttribute('id');        
        console.log("My button clicked with clickedId: " + clickedId);

        /* The prior click was a THEIR CLICK, so need to deselect their selection */
        if (navStates.click_state == THEIR_CLICKED) {
            let tmpBTN_their_old;
            tmpBTN_their_old = document.getElementById(navStates.their_pos.id);
            tmpBTN_their_old.classList.remove('JLpushchart_selected');
            tmpBTN_their_old.classList.add('JLpushchart_unselected');
        }

        // /* My position button clicked -> cycle SELECTED to next position */
        // if (navStates.my_pos.id == clickedId) {
    
        //     document.getElementById(navStates.cycleMap[clickedId]).classList.remove('JLpushchart_unselected');
        //     document.getElementById(navStates.cycleMap[clickedId]).classList.add('JLpushchart_selected');

        //     navStates.my_pos.id = navStates.cycleMap[navStates.my_pos.id];
        //     navStates.my_pos.value = navStates.id2value[navStates.my_pos.id];
            
        //     /* language previous used:
        //                             navStates.selectedPos.id = 'JLpushchart_lj';
        //                 navStates.selectedPos.value = LJ;
        //     */
        // }
        // JLpushchart_render(navStates);  
        // return        
        
        /* Get currently enabled button and reset the state  */
        tmp1BTN = document.getElementById(navStates.my_pos.id);
        tmp1BTN.classList.remove('JLpushchart_selected');
        tmp1BTN.classList.add('JLpushchart_unselected');

        /* Reset the state of their currently disabled button */
        tmp2BTN = document.getElementById(navStates.my_pos.id.replace("_my_", "_their_"));
        tmp2BTN.classList.remove('JLpushchart_disabled');
        tmp2BTN.classList.add('JLpushchart_unselected');

        /* Set the state of the new button */
        this.classList.remove('JLpushchart_unselected');
        this.classList.add('JLpushchart_selected');
        
        /* Update the nav state with the new clicked id */
        navStates.my_pos.id = clickedId;
        navStates.my_pos.value = navStates.id2value[navStates.my_pos.id];
        
        /* Disable their new button */
        let tmp3BTN;
        tmp3BTN = document.getElementById(clickedId.replace("_my_", "_their_"));
        tmp3BTN.classList.add('JLpushchart_disabled');
        tmp3BTN.classList.remove('JLpushchart_unselected');

        navStates.click_state = MY_CLICKED;

        JLpushchart_render(navStates);  
    };

    let their_button_clicked = function() {
        
        console.log("Me current:" + JSON.stringify(navStates.my_pos));
        console.log("They current: " + JSON.stringify(navStates.their_pos));

        let tmp1BTN;
        let tmp2BTN;
        let clickedId = this.getAttribute('id');        
        console.log("Their button clicked with clickedId: " + clickedId);

        // /* My position button clicked -> cycle SELECTED to next position */
        // if (navStates.my_pos.id == clickedId) {
    
        //     document.getElementById(navStates.cycleMap[clickedId]).classList.remove('JLpushchart_unselected');
        //     document.getElementById(navStates.cycleMap[clickedId]).classList.add('JLpushchart_selected');

        //     navStates.my_pos.id = navStates.cycleMap[navStates.my_pos.id];
        //     navStates.my_pos.value = navStates.id2value[navStates.my_pos.id];
            
        //     /* language previous used:
        //                             navStates.selectedPos.id = 'JLpushchart_lj';
        //                 navStates.selectedPos.value = LJ;
        //     */
        // }
        // JLpushchart_render(navStates);  
        // return        
        
        /* Get their button current state */
        if (navStates.click_state == MY_CLICKED) {
            console.log("Current button state: MY_CLICKED" );
        } else {
            console.log("Current button state: NOT MY_CLICKED" );
            tmp1BTN = document.getElementById(navStates.their_pos.id)
            tmp1BTN.classList.remove('JLpushchart_selected');
            tmp1BTN.classList.add('JLpushchart_unselected');    
            this.classList.remove('JLpushchart_unselected');
        }
        
        /* Update their button new state */
        this.classList.add('JLpushchart_selected');
        
        /* Update the nav state with their button click */
        navStates.their_pos.id = clickedId;
        navStates.their_pos.value = navStates.id2value[navStates.their_pos.id];
        
        navStates.click_state = THEIR_CLICKED;
        console.log("New click state:" + navStates.click_state);
        console.log("About to push navStates to render... here it is:");
        console.log(JSON.stringify(navStates));
        JLpushchart_render(navStates);  
    };

    /* this object holds the navigation state which is fed to the renderer */
    let navStates = { 
        stacksize : {
            id: "none",
            value: -1
        }, 
        my_pos : {
            id: "JLpushchart_my_bb",
            value: BB
        }, 
        their_pos : {
            id: "none",
            value: -1
        },
        
        click_state : MY_CLICKED,

        /*translate HTML ID to numeric value of a poker position   */
        id2value : { 
            "JLpushchart_my_lj" : LJ,
            "JLpushchart_my_hj" : HJ,
            "JLpushchart_my_co" : CO,
            "JLpushchart_my_btn" : BTN,
            "JLpushchart_my_sb" : SB,
            "JLpushchart_my_bb" : BB,

            "JLpushchart_their_lj" : LJ,
            "JLpushchart_their_hj" : HJ,
            "JLpushchart_their_co" : CO,
            "JLpushchart_their_btn" : BTN,
            "JLpushchart_their_sb" : SB,
            "JLpushchart_their_bb" : BB
        },
       
        /* cycling to next positon when clicking on an already selected element */
        cycleMap : {
           "JLpushchart_my_lj" : "JLpushchart_my_hj",
           "JLpushchart_my_hj" : "JLpushchart_my_co",
           "JLpushchart_my_co" : "JLpushchart_my_btn",
           "JLpushchart_my_btn" : "JLpushchart_my_sb",
           "JLpushchart_my_sb" : "JLpushchart_my_bb",
           "JLpushchart_my_bb" : "JLpushchart_my_lj",

           "JLpushchart_their_lj" : "JLpushchart_their_hj",
           "JLpushchart_their_hj" : "JLpushchart_their_co",
           "JLpushchart_their_co" : "JLpushchart_their_btn",
           "JLpushchart_their_btn" : "JLpushchart_their_sb",
           "JLpushchart_their_sb" : "JLpushchart_their_bb",
           "JLpushchart_their_bb" : "JLpushchart_their_lj"
        }
    }

    return {    

    initializeScript: function() {

        navStates.stacksize.id = "JLpushchart_cash"
        navStates.stacksize.value = "cash"

        /* initialize of clickable HTML elements for positions*/
        my_buttons = document.getElementById("JLpushchart_my_position").getElementsByTagName("button");
        their_buttons = document.getElementById("JLpushchart_their_position").getElementsByTagName("button");
        
        navStates.click_state = MY_CLICKED;

        for (var i = my_buttons.length - 1; i >= 0; i--) {

        //     /* check for initially selected element by CSS classs*/ 
        //     if (my_buttons[i].className.search("JLpushchart_selected") > -1 ) {
        //         navStates.my_pos.id = my_buttons[i].id;
        //         navStates.my_pos.value = navStates.id2value[my_buttons[i].id];
        //     };
            
        //     /* check for initially selected element by CSS classs*/ 
        //     // if (their_buttons[i].className.search("JLpushchart_selected") > -1 ) {
        //     //     navStates.their_pos.id = their_buttons[i].id;
        //     //     navStates.their_pos.value = navStates.id2value[their_buttons[i].id];
        //     // };

        //     /*  add click events for positions  */
            my_buttons[i].addEventListener("click", my_button_clicked);
            their_buttons[i].addEventListener("click", their_button_clicked);
        }

        // if (navStates.my_pos.value == -1) {
        //     document.getElementById('JLpushchart_my_charts').innerHTML = "HTML error: see console for details";
        //     throw "HTML error: Expecting a <button> tag of class 'JLpushchart_selected' during initialization of clickable HTML elements for positions";
        // }

        // if (navStates.their_pos.value == -1) {
        //     document.getElementById('JLpushchart_their_charts').innerHTML = "HTML error: see console for details";
        //     throw "HTML error: Expecting a <button> tag of class 'JLpushchart_selected' during initialization of clickable HTML elements for positions";
        // }
        
        JLpushchart_render(navStates);      
    }}
} ();

document.addEventListener('DOMContentLoaded', JLpushchart_nav.initializeScript, false);