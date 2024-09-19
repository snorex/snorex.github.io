
JLpushchart_lookuptable = function () {

  
  /* numeric values for each poker positon; an addition of two positions will give an unique value for selecting combos and displaying the correct charts*/

  const LJ = 4;
  const HJ = 8;
  const CO = 16;
  const BTN = 32;
  const SB = 64;
  const BB = 128;  

  /* make lookup table for just the initial my button clicks */
  initial_table = [];
  initial_table['cash'] = [];

  addToInitialTable = function(my_pos, my_hands, their_hands) {
    initial_table['cash'][my_pos] = [];
    initial_table['cash'][my_pos][0] = my_hands;
    initial_table['cash'][my_pos][1] = their_hands;
  };

  addToInitialTable(LJ, ['lj_rfi.PNG'], ['smile.PNG']);
  addToInitialTable(HJ, ['hj_rfi.PNG'], ['hj_vs_lj_open.PNG']);
  addToInitialTable(CO, ['co_rfi.PNG'], ['co_vs_lj_open.PNG', 'co_vs_hj_open.PNG']);
  addToInitialTable(BTN, ['btn_rfi.PNG'], ['btn_vs_lj_open.PNG', 'btn_vs_hj_open.PNG', 'btn_vs_co_open.PNG']);
  addToInitialTable(SB, ['sb_rfi.PNG', 'sb_rfi_simple.png'], ['sb_vs_lj_open.PNG', 'sb_vs_hj_open.PNG', 'sb_vs_co_open.PNG', 'sb_vs_btn_open.PNG']);
  addToInitialTable(BB, ['bb_vs_sb_limp.PNG'], ['bb_vs_lj_open.PNG', 'bb_vs_hj_open.PNG', 'bb_vs_co_open.PNG', 'bb_vs_btn_open.PNG', 'bb_vs_sb_open.PNG']);

  /* lookuptable by stacksize for all positions combos*/
  /* the array index (eg. '15') must match the value property of the button HTML element (eg. '15') and the name of the subfolders where the images are stored*/
  lookuptable = [];
  lookuptable['cash'] = [];
  
  addToLookup = function(pos1, pos2, hands1, hands2) {
    lookuptable['cash'][pos1 + pos2] = [];
    lookuptable['cash'][pos1 + pos2][0] = hands1;
    lookuptable['cash'][pos1 + pos2][1] = hands2;
  };

  addToLookup(LJ, HJ, ['lj_rfi.PNG','lj_vs_hj3bet.PNG'], ['hj_vs_lj_open.PNG', 'hj_vs_lj_4bet.PNG']);
  addToLookup(LJ, CO, ['lj_rfi.PNG','lj_vs_co3bet.PNG'], ['co_vs_lj_open.PNG','co_vs_lj_4bet.PNG']);  
  addToLookup(LJ, BTN, ['lj_rfi.PNG','lj_vs_btn3bet.PNG'], ['btn_vs_lj_open.PNG', 'btn_vs_lj_4bet.PNG']);
  addToLookup(LJ, SB, ['lj_rfi.PNG','lj_vs_sb3bet.PNG'], ['sb_vs_lj_open.PNG', 'sb_vs_lj_4bet.PNG']);
  addToLookup(LJ, BB, ['lj_rfi.PNG','lj_vs_bb3bet.PNG'], ['bb_vs_lj_open.PNG', 'bb_cold4bet.PNG', 'bb_vs_lj_4bet.PNG']);
  
  addToLookup(HJ, CO, ['hj_rfi.PNG','hj_vs_co3bet.PNG'], ['co_vs_hj_open.PNG', 'co_vs_hj_4bet.PNG']);
  addToLookup(HJ, BTN, ['hj_rfi.PNG','hj_vs_btn3bet.PNG'], ['btn_vs_hj_open.PNG', 'btn_vs_hj_4bet.PNG']);
  addToLookup(HJ, SB, ['hj_rfi.PNG','hj_vs_sb3bet.PNG'], ['sb_vs_hj_open.PNG', 'sb_vs_hj_4bet.PNG']);
  addToLookup(HJ, BB, ['hj_rfi.PNG','hj_vs_bb3bet.PNG'], ['bb_vs_hj_open.PNG', 'bb_cold4bet.PNG', 'bb_vs_hj_4bet.PNG']);

  addToLookup(CO, BTN, ['co_rfi.PNG','co_vs_btn3bet.PNG'], ['btn_vs_co_open.PNG', 'btn_vs_co_4bet.PNG']);
  addToLookup(CO, SB, ['co_rfi.PNG','co_vs_sb3bet.PNG'], ['sb_vs_co_open.PNG', 'sb_vs_co_4bet.PNG']);
  addToLookup(CO, BB, ['co_rfi.PNG','co_vs_bb3bet.PNG'], ['bb_vs_co_open.PNG', 'bb_cold4bet.PNG', 'bb_vs_co_4bet.PNG']);

  addToLookup(BTN, SB, ['btn_rfi.PNG','btn_vs_sb3bet.PNG'], ['sb_vs_btn_open.PNG', 'sb_vs_btn_4bet.PNG']);
  addToLookup(BTN, BB, ['btn_rfi.PNG','btn_vs_bb3bet.PNG'], ['bb_vs_btn_open.PNG', 'bb_cold4bet.PNG', 'bb_vs_btn_4bet.PNG']);
  
  addToLookup(SB, BB, ['sb_rfi.PNG','sb_vs_bb_3x5raise.PNG', 'sb3x_vs_bb3bet.PNG'], ['bb_vs_sb_open.PNG', 'bb_vs_sb_limp.PNG', 'bb_vs_sb_limp_raise.PNG','bb_vs_sb_4bet.PNG', 'bb_cold4bet.PNG']);
  
  return lookuptable

} ();

JLpushchart_render = function(navStates) {

  const MY_CLICKED = 1;
  const THEIR_CLICKED = 2;

  console.log("In renderer... here is new navStates...");
  console.log(JSON.stringify(navStates));

  if (navStates.click_state == MY_CLICKED) {
    console.log("Render function: render MY_CLICKED");
    var top_elements = JSON.parse(JSON.stringify(initial_table['cash'][navStates.my_pos.value][0]));
    var bottom_elements = JSON.parse(JSON.stringify(initial_table['cash'][navStates.my_pos.value][1]));
  } else {
    console.log("Render function: render THEY_CLICKED");
    if (navStates.my_pos.value > navStates.their_pos.value) {
      var top_elements = JSON.parse(JSON.stringify(lookuptable['cash'][navStates.my_pos.value + navStates.their_pos.value][1]));
      var bottom_elements = JSON.parse(JSON.stringify(lookuptable['cash'][navStates.my_pos.value + navStates.their_pos.value][0]));
    } else {
      var top_elements = JSON.parse(JSON.stringify(lookuptable['cash'][navStates.my_pos.value + navStates.their_pos.value][0]));
      var bottom_elements = JSON.parse(JSON.stringify(lookuptable['cash'][navStates.my_pos.value + navStates.their_pos.value][1]));
    }
  };

        // deepcopy of of sub-array, simple assignment will reference it
      
        document.getElementById("JLpushchart_my_charts").innerHTML = "";        
        document.getElementById("JLpushchart_their_charts").innerHTML = "";        

        top_elements.forEach(
          function myFunction(filename) {
           imgSRC = 'img/' + 'cash' + '/' + filename;
           document.getElementById("JLpushchart_my_charts").innerHTML += '<img src="' + imgSRC+ '" alt="' + imgSRC+ '" class="JLpushchart_responsive">';
          }
        )

        bottom_elements.forEach(
          function myFunction(filename) {
           imgSRC = 'img/' + 'cash' + '/' + filename;
           document.getElementById("JLpushchart_their_charts").innerHTML += '<img src="' + imgSRC+ '" alt="' + imgSRC+ '" class="JLpushchart_responsive">';
          }
        )
}
