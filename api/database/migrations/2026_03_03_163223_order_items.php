<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("order_items", function (Blueprint $table) {
        $table->id();
        $table->foreignId("id_order")->constrained("orders")->onDelete("cascade");
        $table->foreignId("id_product")->constrained("products")->onDelete("cascade");
        $table->integer("quantity")->default(1);
        $table->decimal("price", 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
