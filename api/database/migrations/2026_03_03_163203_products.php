<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("products", function (Blueprint $table) {
        $table->id();
        $table->foreignId("id_category")
        ->constrained("categories")
        ->onDelete("cascade");
        $table->foreignId("id_admin")
        ->constrained("admins")
        ->onDelete("cascade");
        $table->string("name");
        $table->decimal("price",10,2)->default(0);
        $table->text("description")->nullable();
        $table->text("details")->nullable();
        $table->integer("stock")->default(0);
        $table->timestamps();
        $table->timestamp("updated_at")->nullable();
        $table->decimal("last_price",10,2)->nullable()->default(null);
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
