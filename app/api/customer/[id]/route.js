import Customer from "@/models/Customer";

export async function GET(request, { params }) {
    const id = params.id;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return new Response(JSON.stringify({ success: false, message: 'Customer not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, data: customer }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    try {
      const customer = await Customer.findByIdAndUpdate(id, body, { new: true });
      if (!customer) {
        return new Response(JSON.stringify({ success: false, message: 'Customer not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
  }

export async function DELETE(request, { params }) {
    const id = params.id;
    try {
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return new Response(JSON.stringify({ success: false, message: 'Customer not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, data: customer }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}