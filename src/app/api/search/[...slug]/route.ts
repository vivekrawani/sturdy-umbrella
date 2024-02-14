export async function GET(request : any, params:any) {
  
    // response.end(`Post: ${slug}`)
//   const res = await getAllProduct()
console.log(params);


  return Response.json(params);
}