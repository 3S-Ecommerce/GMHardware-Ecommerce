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
        Schema::table('products', function (Blueprint $table) {
            $table->text("image_2")->nullable()->after('image');
            $table->text("image_3")->nullable()->after('image_2');
            $table->text("image_4")->nullable()->after('image_3');
            $table->text("image_5")->nullable()->after('image_4');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['image_2', 'image_3', 'image_4', 'image_5']);
        });
    }
};
