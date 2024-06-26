const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all vehicle items, including inv_make, inv_model, and inv_year by inv_id
 * ************************** */
async function getItemById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
      WHERE inv_id = $1`, 
      [inv_id]
      )
    return data.rows
  } catch (error) {
    console.error("getItemById error: " + error);
  }
}

/* ***************************
 *  Model function to add a new Classification 
 * ************************** */
async function addNewClassification(classificationName) {
  try {
    await pool.query(
      `INSERT INTO public.classification (classification_name) VALUES ($1)`,
      [classificationName]
     ) 
  } catch (error) {
      console.error("addNewClassification error: " + error)
      throw error; // Re-throw the error to be caught by the calling function
  }

}
  

module.exports = {getClassifications, getInventoryByClassificationId, getItemById, addNewClassification}