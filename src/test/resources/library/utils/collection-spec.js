describe("_ns.CollectionUtils", function () {
    describe("itemByProperty", function () {
        it("Should return null in the case of a null or empty collection or value", function () {
            expect(_ns.CollectionUtils.itemByProperty(null, "name", "Mike")).toBeNull();
            expect(_ns.CollectionUtils.itemByProperty([], "age", 5)).toBeNull();
            expect(_ns.CollectionUtils.itemByProperty(["Howard"], null, null)).toBeNull();
        });

        it("Should return the item that matches if no property name is provided", function () {
            expect(_ns.CollectionUtils.itemByProperty(["John", 5, "Lemon"], null, "John")).toEqual("John");
        });

        it("Should play nice with single properties", function () {
            expect(_ns.CollectionUtils.itemByProperty([
                {id: 5},
                {id: 7}
            ], "id", 7)).toEqual({id: 7});
        });

        it("Should play nice with dot properties", function () {
            expect(_ns.CollectionUtils.itemByProperty([
                {name: {first: "Horton"}},
                {name: {first: "Charles"}}
            ], "name.first", "Charles")).toEqual({name: {first: "Charles"}});
        });

        it("Should return null if there is no match", function () {
            expect(_ns.CollectionUtils.itemByProperty([
                {name: {first: "Horton"}},
                {name: {first: "Charles"}}
            ], "name.first", "Charle")).toBeNull();
        });

        it("Should return null if there is no match without a property", function () {
            expect(_ns.CollectionUtils.itemByProperty(["John", 5, "Lemon"], null, "6")).toBeNull();
        });
    });

    describe("updateByProperty", function () {
        it("Should do nothing with a null or empty collection", function () {
            var collection = null;
            _ns.CollectionUtils.updateByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toBeNull();
            collection = [];
            _ns.CollectionUtils.updateByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toEqual([]);
        });

        it("Should do nothing with a null item", function () {
            var collection = [
                {name: "Mike"}
            ];
            _ns.CollectionUtils.updateByProperty(collection, null, "name");
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should do nothing with a null propertyName", function () {
            var collection = [
                {name: "Mike"}
            ];
            _ns.CollectionUtils.updateByProperty(collection, {name: "Kyle"}, null);
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should update the first item found by property", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                {name: "Mike"}
            ];
            _ns.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Mike", color: "Puce"},
                {name: "Smitty"},
                {name: "Mike"}
            ]);
        });

        it("Should be able to handle nulls in a list", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                null
            ];
            _ns.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Mike", color: "Puce"},
                {name: "Smitty"},
                null
            ]);
        });

        it("Should be able to handle undefineds in a list", function () {
            var collection = [undefined, {name: "Smitty"}, null];
            _ns.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([undefined, {name: "Smitty"}, null]);
        });
    });

    describe("removeByProperty", function () {
        it("Should do nothing with a null or empty collection", function () {
            var collection = null;
            _ns.CollectionUtils.removeByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toBeNull();
            collection = [];
            _ns.CollectionUtils.removeByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toEqual([]);
        });

        it("Should do nothing with a null item", function () {
            var collection = [
                {name: "Mike"}
            ];
            _ns.CollectionUtils.removeByProperty(collection, null, "name");
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should do nothing with a null propertyName", function () {
            var collection = [
                {name: "Mike"}
            ];
            _ns.CollectionUtils.removeByProperty(collection, {name: "Kyle"}, null);
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should update the first item found by property", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                {name: "Mike"}
            ];
            _ns.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Smitty"},
                {name: "Mike"}
            ]);
        });

        it("Should be able to handle nulls in a list", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                null
            ];
            _ns.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Smitty"},
                null
            ]);
        });

        it("Should be able to handle undefineds in a list", function () {
            var collection = [undefined, {name: "Smitty"}, null];
            _ns.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([undefined, {name: "Smitty"}, null]);
        });

        describe("containsExclusively", function () {
            it("Should return false if either the collection or compare are null", function () {
                expect(_ns.CollectionUtils.containsExclusively(undefined, undefined)).toBeFalsy();
                expect(_ns.CollectionUtils.containsExclusively(null, undefined)).toBeFalsy();
                expect(_ns.CollectionUtils.containsExclusively(undefined, null)).toBeFalsy();
                expect(_ns.CollectionUtils.containsExclusively([], null)).toBeFalsy();
                expect(_ns.CollectionUtils.containsExclusively(null, [])).toBeFalsy();
            });

            it("Should return true if they are both empty", function () {
                expect(_ns.CollectionUtils.containsExclusively([], [])).toBeTruthy();
            });

            it("Should not worry about order", function () {
                expect(_ns.CollectionUtils.containsExclusively([4, 5, 6], [6, 4, 5])).toBeTruthy();
            });

            it("Should play nice in the case order is okay", function () {
                expect(_ns.CollectionUtils.containsExclusively(["Mike", "Tom", 0], ["Mike", "Tom", 0])).toBeTruthy();
            });

            it("Should return false for comparison sets that are included but not exclusive", function () {
                expect(_ns.CollectionUtils.containsExclusively([1, "Tom", 6], [1, "Tom"])).toBeFalsy();
            });

            it("Should worry about types", function () {
                expect(_ns.CollectionUtils.containsExclusively([5, 6], [6, "5"])).toBeFalsy();
            });

            it("Should return false when the comparison has an item that the original does not have", function () {
                expect(_ns.CollectionUtils.containsExclusively([1, 2], [1, 2, 3])).toBeFalsy();
            });
        });
    });


    describe("uniqueMap", function () {
        it("Should return an empty map if the collection is null, undefined or empty", function () {
            expect(_ns.CollectionUtils.uniqueMap(undefined)).toEqual({});
            expect(_ns.CollectionUtils.uniqueMap(null)).toEqual({});
            expect(_ns.CollectionUtils.uniqueMap([])).toEqual({});
        });

        it("Should play nice with no properties", function () {
            expect(_ns.CollectionUtils.uniqueMap(["Trevor", "Mike", "Howard"])).toEqual({Trevor: "Trevor", Mike: "Mike", Howard: "Howard"});
        });

        it("Should play nice with dot properties", function () {
            expect(_ns.CollectionUtils.uniqueMap([
                {name: {first: "Charles", last: "Evans"}}
            ], "name.last")).toEqual({Evans: {name: {first: "Charles", last: "Evans"}}});
        });
    });

    describe("containsMatchByProperty", function () {
        it("Should return false if collectionA is undefined", function () {
            expect(_ns.CollectionUtils.containMatchByProperty(undefined, [
                {name: 1}
            ], 'name')).toBeFalsy();
        });

        it("Should return false if collectionB is undefined", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {name: 1}
            ], null, 'name')).toBeFalsy();
        });

        it("Should return false if collectionA is empty", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([], [
                {name: "tom"}
            ], "name")).toBeFalsy();
        });

        it("Should return false if collectionB is empty", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {age: 50}
            ], [], 'age')).toBeFalsy();
        });

        it("Should play nice with single properties", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {color: "Orange"},
                {color: "Red"},
                {color: "Blue"}
            ], [
                {color: "Black"},
                {color: "Red"},
                {color: "Green"}
            ], "color")).toBeTruthy();
        });

        it("Should play nice with deep properties", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {color: {hue: {saturation: "Light"}}, hex: "#000000"},
                {color: {hue: {saturation: "Light"}}},
                {color: {hue: {saturation: "Heavy"}}}
            ], [
                {color: {hue: {saturation: "Heavy"}}, hex: "#000000"},
                {color: {hue: {saturation: "Med"}}},
                {color: {hue: {saturation: "Super Heavy"}, hex: "#00FF00"}}
            ], "color.hue.saturation")).toBeTruthy();
        });

        it("Should return true when there is a match", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {color: {hue: {saturation: "Light"}}, hex: "#000000"},
                {color: {hue: {saturation: "Light"}, hex: "#00FF00"}},
                {color: {hue: {saturation: "Heavy"}}}
            ], [
                {color: {hue: {saturation: "Heavy"}}, hex: "#000000"},
                {color: {hue: {saturation: "Med"}}},
                {color: {hue: {saturation: "Super Heavy"}, hex: "#00FF00"}}
            ], "color.hex")).toBeTruthy();
        });

        it("Should return false when there is not a match", function () {
            expect(_ns.CollectionUtils.containMatchByProperty([
                {color: {hue: {saturation: "Light"}}, hex: "#000000"},
                {color: {hue: {saturation: "Light"}, hex: "#00FF00"}},
                {color: {hue: {saturation: "Heavy"}}}
            ], [
                {color: {hue: {saturation: "Heavy"}}, hex: "#000000"},
                {color: {hue: {saturation: "Med"}}},
                {color: {hue: {saturation: "Super Heavy"}, hex: "#00FF00"}}
            ], "color.hue.hex")).toBeFalsy();
        });
    });

    describe("collectionContainsAllOtherItems", function () {
        it("Should return false if collectionA is undefined", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems(undefined, [
                {name: 1}
            ], 'name')).toBeFalsy();
        });

        it("Should return false if collectionB is undefined", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {name: 1}
            ], null, 'name')).toBeFalsy();
        });

        it("Should return false if collectionA is empty", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([], [
                {name: "tom"}
            ], "name")).toBeFalsy();
        });

        it("Should return false if collectionB is empty", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {age: 50}
            ], [], 'age')).toBeFalsy();
        });

        it("Should play nice with single properties", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {age: 60}, {age: 50}
            ], [
                {age: 50}, {age: 60}
            ], 'age')).toBeTruthy();
        });

        it("Should play nice with deep properties", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {age: {time: 39, value: 78989}}, {age: {time: 34, value: "George"}}
            ], [
                {age: {time: 34, value: 67}}, {age: {time: 39, value: 102}}
            ], 'age.time')).toBeTruthy();
        });

        it("Should return false when there is a mismatch", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {age: {time: 39, value: 78989}}, {age: {time: 34, value: "George"}}
            ], [
                {age: {time: 34, value: 67}}, {age: {time: 39, value: 102}}, 55
            ], 'age.time')).toBeFalsy();
        });

        it("Should return true in cases where the collections match up via these properties", function () {
            expect(_ns.CollectionUtils.collectionContainsAllOtherItems([
                {age: {time: 39, value: 78989}}, {age: {time: 34, value: "George"}}, {name: "Steiny"}, 90
            ], [
                {age: {time: 34, value: 67}}, {age: {time: 39, value: 102}}
            ], 'age.time')).toBeTruthy();
        });
    });
});