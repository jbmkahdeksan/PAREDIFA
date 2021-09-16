/*
* Description:
*   Bez curvs class
* Authors:
*   Andres Alvarez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chavarria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/


export default class Bezcurve{
    constructor(start, coord1, coord2, end, trInfo ) {
   
        this.id=Date.now()-trInfo.id;
        this.trInfo=trInfo;
        this.curve=[start,coord1,coord2,end];
    
     

    }
}