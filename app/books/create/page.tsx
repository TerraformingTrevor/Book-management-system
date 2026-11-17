import { BookCreateForm } from "./_components/book-create-form";


export default function BookCreatePage() {
    return (
        <div className="space-y-2 p-6">
            <h1 className="text-3xl font-bold">Create Book</h1>


            
            <BookCreateForm />
            
        </div>
    );
}